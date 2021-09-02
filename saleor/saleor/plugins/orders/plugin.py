from saleor.plugins.base_plugin import BasePlugin

from saleor.fusion_online.orders.serializers import SalesOrderSerializer
from saleor.fusion_online.shipping_address.serializers import AddressSerializer, OrderAddressSerializer
from saleor.fusion_online.notifications.utils import send_sales_order_notification


class OrderCreatedPlugin(BasePlugin):

    PLUGIN_ID = "fusion_online.order_created"
    PLUGIN_NAME = "Fusion Online - Order Created"

    DEFAULT_ACTIVE = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def order_created(self, order, previous_value):

        entered_by = 7964957
        hubspot_vid = 908051

        private_metadata = {
            'due_date': 1630604452,
            'customer_purchase_order_num': 'test',
            'rms_payment_type': 'PREPAID'
        }
        order.private_metadata = private_metadata
        order.save()

        ship_to_address = order.shipping_address
        address_serializer = OrderAddressSerializer(ship_to_address)

        address_serialized = {
            'fo_ship_to_address_ref_id': 31,
            'customer_id': 4535250721,
            'ship_to_name': 'warehouse-1',
            'address': '180 NE 29th St, Apt 1904',
            'city': 'MIAMI',
            'state': 'FL',
            'country': 'US',
            'ship_via': 'UPS',
            'vat_id': 123
        }

        lines = order.lines.all()
        items = []
        for line in order.lines.all():
            unit_price = line.unit_price_gross_amount.to_eng_string()
            product_metadata = line.variant.product.metadata
            item = {
                'item_num_id': product_metadata.get('item_num_id'),
                'cipn': 'test',
                'mpn': product_metadata.get('mpn'),
                'mcode': product_metadata.get('mcode'),
                'quantity': line.quantity,
                'unit_sell_price': unit_price
            }
            items.append(item)
        sales_order = {
            'hubspot_vid': hubspot_vid,
            'customer_purchase_order_num': 123,  # This needs to change to customer input
            'entered_by': entered_by,
            'ship_to': address_serialized,
            'due_date': private_metadata.get('due_date'),
            'items': items,
            'fo_order_ref_id': order.id,
            'fo_payment_status': 'PREPAID'
        }

        # Serialize for sns
        serialized = SalesOrderSerializer(sales_order)

        # Send sns
        send_sales_order_notification(sales_order)
