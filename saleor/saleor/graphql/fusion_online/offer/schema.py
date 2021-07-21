import graphene

from .types import Offer
from .resolvers import resolve_offers

class OfferQueries(graphene.ObjectType):
	offers = graphene.List(Offer)

	def resolve_offers(self, info, **_kwargs):
		return resolve_offers()
