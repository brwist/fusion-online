import graphene

from .types import ShipToAddressInfo
from .resolvers import resolve_ship_to_address_info

class ShipToAddressInfo(graphene.ObjectType):
	ship_to_address_info = graphene.List(ShipToAddressInfo)

	def resolve_ship_to_address_info(self, info, **_kwargs):
		return resolve_ship_to_address_info()