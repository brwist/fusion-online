from rest_framework.serializers import CharField, IntegerField, ModelSerializer, SerializerMethodField, PrimaryKeyRelatedField

from saleor.order.models import Order
from saleor.checkout.models import Checkout


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

    class Meta:
        fields = ['item_num_id', 'cipn', 'mpn', 'mcode', 'quantity', 'unit_sell_price']


class SalesOrderSerializer(ModelSerializer):

    items = SalesOrderItemSerializer(many=True)

    class Meta:
        fields = ['hubspot_vid', 'customer_purchase_order_num', 'entered_by',
                  'ship_to_num', 'due_date', 'items', 'fo_order_ref_id', 'fo_payment_status']


# Below serializers are based on Saleor models and used for reference

class OrderSerializer(ModelSerializer):

    class Meta:
        model = Order
        fields = ['id', 'created', 'status', 'user', 'language_code', 'tracking_client_id', 'billing_address', 'shipping_address', 'user_email', 'currency', 'shipping_method', 'shipping_method', 'shipping_price_net_amount', 'shipping_price_net', 'shipping_price_gross_amount', 'shipping_price_gross',
                  'shipping_price', 'token', 'checkout_token', 'total_net_amount', 'total_net', 'total_gross_amount', 'total_gross', 'total', 'voucher', 'gift_cars', 'discount_amount', 'discount', 'discount_name', 'translated_discount_name', 'display_gross_prices', 'customer_note', 'weight', 'objects']


class CheckoutSerializer(ModelSerializer):

    class Meta:
        # model = Checkout
        fields = ['id', 'email', 'quantity', 'shipping_address']
