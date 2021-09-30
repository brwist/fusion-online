from django.db.models import fields
from rest_framework.fields import ChoiceField
from rest_framework.serializers import CharField, DecimalField, RelatedField, IntegerField, ModelSerializer, SerializerMethodField, Field, PrimaryKeyRelatedField
from django.conf import settings
from saleor.order.models import Order, OrderLine
from saleor.product.models import Product
from saleor.account.models import Address
from saleor.checkout.models import Checkout
from saleor.fusion_online.shipping_address.serializers import ShippingAddressSerializer
from saleor.fusion_online.shipping_address.models import ShippingAddress

# {
#   "hubspot_vid": 0,
#   "customer_purchase_order_num": "string",
#   "entered_by": 0,
#   "ship_to_num": 0,
#   "due_date": 0,
#   "items": [
#     {
#       "item_num_id": 0,
#       "cipn": "string",
#       "mpn": "string",
#       "mcode": "string",
#       "quantity": 1,
#       "unit_sell_price": "12.00125"
#     }
#   ],
#   "fo_order_ref_id": 0,
#   "fo_payment_status": "PREPAID"
# }

class SalesOrderItemSerializer(ModelSerializer):
    unit_sell_price = CharField(source='unit_price_net_amount', read_only=True)
    cipn = IntegerField(read_only=True, default=123)
    item_num_id = IntegerField()
    item_master_id = IntegerField()
    mpn = CharField(read_only=True)
    mcode = CharField(read_only=True)

    class Meta:
        model = OrderLine
        fields = ['item_master_id', 'item_num_id', 'cipn', 'mpn', 'mcode', 'quantity', 'unit_sell_price']

class ShipToFieldSerializer(ModelSerializer):
    fo_ship_to_address_ref_id = IntegerField(source="pk")
    address = SerializerMethodField('get_street_address')
    state = CharField(source='country_area')
    hubspot_company_id = IntegerField(source='customer_id', read_only=True)
    customer_id = IntegerField(write_only=True)

    class Meta:
        model = Address
        fields = ["fo_ship_to_address_ref_id", "customer_id", "ship_to_name", "address", "city", "state", "country", "ship_via", "vat_id", "hubspot_company_id"]
    
    def get_street_address(self, obj):
        addr1 = obj.street_address_1
        addr2 = obj.street_address_2
        return addr1 + '\n' + addr2 if addr2 else addr1
    

class ShipToField(RelatedField):
    def to_representation(self, obj):
        return ShipToFieldSerializer(obj).data

    def to_internal_value(self, data):
        address = Address.objects.get_or_create(**data)
        return address[0]



class SalesOrderSerializer(ModelSerializer):
    hubspot_vid = IntegerField(default=908051, read_only=True)
    entered_by_hubspot_owner_id = IntegerField(read_only=True, default=7964957)
    ship_to = ShipToField(queryset=Address.objects.all())
    items = SalesOrderItemSerializer(many=True)
    customer_purchase_order_num = CharField(source='private_metadata.customer_purchase_order_num')
    due_date = IntegerField(source='private_metadata.due_date')
    fo_order_ref_id = IntegerField(source='pk', read_only=True)
    fo_payment_status = CharField(source='private_metadata.fo_payment_status')
    class Meta:
        model = Order
        fields = ['hubspot_vid', 'customer_purchase_order_num',
                  'ship_to', 'due_date', 'items', 'fo_order_ref_id', 'fo_payment_status', 'entered_by_hubspot_owner_id']
    

    def create(self, validated_data):
        shipping_data = validated_data.pop('ship_to')
        order_items_data = validated_data.pop('items')
        sales_order = Order.objects.create(**validated_data, shipping_address=shipping_data)

        for item in order_items_data:
            product = Product.objects.get(metadata__item_master_id=item['item_master_id'])
            product_variant = product.default_variant
            OrderLine.objects.create(
                order=sales_order,
                quantity=item['quantity'],
                unit_price_net_amount=product_variant.price_amount,
                variant=product_variant,
                unit_price_gross_amount=product_variant.price_amount,
                is_shipping_required=True
                )
        
        return sales_order


