from saleor.plugins.base_plugin import BasePlugin

from ...fusion_online.hubspot.serializers import HubspotContactSerializer

from saleor.fusion_online.hubspot.email import HubspotEmails
from saleor.fusion_online.notifications.utils import send_sales_order_notification
from saleor.fusion_online.orders.serializers import SalesOrderSerializer

import json


class FusionOnlinePlugin(BasePlugin):
    PLUGIN_ID = "fusion_online"
    PLUGIN_NAME = "Fusion Online"

    DEFAULT_ACTIVE = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def order_fully_paid(self, order, previous_value):

        # SNS notification
        order_serialized = SalesOrderSerializer(order)
        send_sales_order_notification(order_serialized.data)

        # Confirmation Email
        hubspot_email = HubspotEmails()
        hubspot_email.send_order_confirmation(
            order)
