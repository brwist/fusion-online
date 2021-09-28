from ....fusion_online.shipping_address import models
from .types import ShipToAddressInfo

def resolve_ship_to_address_info():
	return models.ShippingAddress.objects.all()