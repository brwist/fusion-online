from django.db.models import fields
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
    # unit_sell_price = CharField(source='unit_price_net_amount', read_only=True)
    cipn = IntegerField(read_only=True, default=123)
    item_num_id = IntegerField()
    # mpn = IntegerField(source="variant.product.private_metadata.mpn", read_only=True)
    # mcode = IntegerField(source="variant.product.private_metadata.mcode", read_only=True)

    class Meta:
        model = OrderLine
        # fields = ['item_num_id', 'cipn', 'mpn', 'mcode', 'quantity']
        fields = ['item_num_id', 'cipn', 'quantity']

class ShipToFieldSerializer(ModelSerializer):
    fo_ship_to_address_ref_id = CharField(source="pk")
    address = SerializerMethodField('get_street_address')
    state = CharField(source='country_area')
    class Meta:
        model = Address
        fields = ["fo_ship_to_address_ref_id", "customer_id", "ship_to_name", "address", "city", "state", "country", "ship_via", "vat_id"]
    
    def get_street_address(self, obj):
        addr1 = obj.street_address_1
        addr2 = obj.street_address_2
        return addr1 + '\n' + addr2 if addr2 else addr1

class ShipToField(RelatedField):
    def to_representation(self, obj):
        return ShipToFieldSerializer(obj).data

    def to_internal_value(self, data):
        try:
            address = Address.objects.filter(**data).first()
            print("found matching address:", address)
            return address
        except Address.DoesNotExist:
            print("did not find an address")
            return Address.objects.create(**data)



class SalesOrderSerializer(ModelSerializer):
    hubspot_vid = IntegerField(default=0, read_only=True)
    entered_by = IntegerField(default=0, read_only=True)
    ship_to = ShipToField(queryset=Address.objects.all())
    items = SalesOrderItemSerializer(many=True, write_only=True)
    customer_purchase_order_num = CharField(source='private_metadata.customer_purchase_order_num')
    due_date = IntegerField(source='private_metadata.due_date')
    fo_order_ref_id = CharField(source='pk', read_only=True)
    fo_payment_status = CharField(source='private_metadata.fo_payment_status')
    class Meta:
        model = Order
        fields = ['hubspot_vid', 'customer_purchase_order_num', 'entered_by',
                  'ship_to', 'due_date', 'items', 'fo_order_ref_id', 'fo_payment_status']
    
    def to_internal_value(self, data):
        return super().to_internal_value(data)
        
    def create(self, validated_data):
        shipping_data = validated_data.pop('ship_to')
        order_items_data = validated_data.pop('items')
        print('in save')
        print("create shipping address error")
        sales_order = Order.objects.create(**validated_data, shipping_address=shipping_data)

        for item in order_items_data:
            print('creating orderline for each item')
            product = Product.objects.get(metadata__item_num_id=item['item_num_id'])
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


