import graphene

from ....fusion_online.shipping_address import models
from .types import ShippingAddress

def resolve_shipping_address():
	return models.ShippingAddress.objects.all()