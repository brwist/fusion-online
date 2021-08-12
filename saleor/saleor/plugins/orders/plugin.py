from saleor.plugins.base_plugin import BasePlugin


class OrderCreatedPlugin(BasePlugin):

    PLUGIN_ID = "fusion_online.order_created"
    PLUGIN_NAME = "Fusion Online - Order Created"

    DEFAULT_ACTIVE = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def postprocess_order_creation(self, order, previous_value):
        a = order
