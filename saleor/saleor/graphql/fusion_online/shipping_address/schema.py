from saleor.saleor.fusion_online import shipping_address
import graphene

from .types import ShippingAddress
from .resolvers import resolve_shipping_address

class ShippingAddress(graphene.ObjectType):
	shipping_address = graphene.List(ShippingAddress)

	def resolve_shipping_address(self, info, **_kwargs):
		return resolve_shipping_address()