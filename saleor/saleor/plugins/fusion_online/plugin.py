from saleor.plugins.base_plugin import BasePlugin

from ...fusion_online.hubspot.serializers import HubspotContactSerializer

from saleor.fusion_online.hubspot.email import HubspotEmails


class FusionOnlinePlugin(BasePlugin):
    PLUGIN_ID = "fusion_online"
    PLUGIN_NAME = "Fusion Online"

    DEFAULT_ACTIVE = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def order_fully_paid(self, order, previous_value):

        hubspot_email = HubspotEmails()
        hubspot_email.send_order_confirmation(
            order)
