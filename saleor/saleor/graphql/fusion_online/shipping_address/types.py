from ....fusion_online.shipping_address import models
from ...core.connection import DjangoObjectType

class ShipToAddressInfo(DjangoObjectType):
	class Meta:
		model = models.ShippingAddress
		fields = ("customer_id", "ship_to_name", "ship_via", "vat_id", "ship_to_num", "validation_message", "created", "updated")
