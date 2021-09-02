from saleor.plugins.base_plugin import BasePlugin

from saleor.fusion_online.orders.serializers import SalesOrderSerializer
from saleor.fusion_online.notifications.utils import send_sales_order_notification


class OrderCreatedPlugin(BasePlugin):

    PLUGIN_ID = "fusion_online.order_created"
    PLUGIN_NAME = "Fusion Online - Order Created"

    DEFAULT_ACTIVE = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def order_created(self, order, previous_value):

        private_metadata = {
            'due_date': 123,
            'customer_purchase_order_num': 'test',
            'fo_payment_status': 'PREPAID'
        }
        order.private_metadata = private_metadata
        order.save()

        # Serialize for sns
        serialized = SalesOrderSerializer(order)

        # Send sns
        send_sales_order_notification(serialized.data)
