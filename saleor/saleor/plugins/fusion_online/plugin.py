from saleor.plugins.base_plugin import BasePlugin

from ...fusion_online.hubspot.serializers import HubspotContactSerializer


class FusionOnlinePlugin(BasePlugin):
    PLUGIN_ID = "fusion_online"
    PLUGIN_NAME = "Fusion Online"

    DEFAULT_ACTIVE = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def customer_created(self, customer: "User", previous_value):
        return
        # print("---In customer create plugin---")
        # data = {
        #     "properties": {
        #         "firstname": "Sample contact",
        #         "email": customer.email,
        #         "approval_status": "Pending"
        #     }
        # }
        # try:
        #     serializer = HubspotContactSerializer(data=data)

        #     if serializer.is_valid():
        #         response = serializer.save()
        #         print("Hubspot api response:", response)
        #     else:
        #         print("hubspot contact serializer errors:", serializer.errors)
        # except Exception as e:
        #     print("hubspot contact create error:", str(e))
