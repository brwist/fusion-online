import graphene

from .types import Offer
from .resolvers import resolve_offers


class OfferQueries(graphene.ObjectType):
    offers = graphene.List(Offer, item_master_id=graphene.String())

    def resolve_offers(self, info, **_kwargs):
        if 'item_master_id' in _kwargs:
            return resolve_offers(_kwargs['item_master_id'])
        return resolve_offers()
