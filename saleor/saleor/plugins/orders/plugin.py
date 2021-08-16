from saleor.plugins.base_plugin import BasePlugin


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
            'rms_payment_type': 'PREPAID'
        }
        order.private_metadata = private_metadata
        order.save()
