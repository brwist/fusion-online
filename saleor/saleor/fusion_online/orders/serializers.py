from rest_framework.serializers import CharField, DecimalField, IntegerField, ModelSerializer, SerializerMethodField, PrimaryKeyRelatedField
from django.conf import settings
from saleor.order.models import Order, OrderLine
from saleor.product.models import Product
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
    item_num_id = IntegerField(source="variant.product.metadata__item_num_id", read_only=True)
    mpn = IntegerField(source="variant.product.metadata__mpn", read_only=True)
    mcode = IntegerField(source="variant.product.metadata__mcode", read_only=True)

    class Meta:
        model = OrderLine
        fields = ['item_num_id', 'cipn', 'mpn', 'mcode', 'quantity', 'unit_sell_price']


class SalesOrderSerializer(ModelSerializer):
    hubspot_vid = IntegerField(default=0, read_only=True)
    entered_by = IntegerField(default=0, read_only=True)
    items = SalesOrderItemSerializer(many=True)
    ship_to = ShippingAddressSerializer()
    customer_purchase_order_num = CharField(source='private_metadata__customer_purchase_order_num')
    due_date = IntegerField(source='private_metadata__due_date')
    fo_order_ref_id = CharField(source='pk', read_only=True)
    fo_payment_status = CharField(source='private_metadata__fo_payment_status')
    class Meta:
        model = Order
        fields = ['hubspot_vid', 'customer_purchase_order_num', 'entered_by',
                  'ship_to', 'due_date', 'items', 'fo_order_ref_id', 'fo_payment_status']

    def create(self, validated_data):
        shipping_data = validated_data.pop('ship_to')
        order_items_data = validated_data.pop('items')
        sales_order = Order.objects.create(**validated_data)
        ShippingAddress.objects.create(**shipping_data)

        for item in order_items_data:
            product = Product.objects.get(metadata__item_num_id=item.item_num_id)
            print('product', product)
            OrderLine.objects.create(order=sales_order, **item, variant=product.default_variant)
        
        return sales_order


