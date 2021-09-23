import graphene

from .types import Offer
from .resolvers import resolve_offers


class OfferQueries(graphene.ObjectType):
    offers = graphene.List(Offer, item_num_id=graphene.String())

    def resolve_offers(self, info, **_kwargs):
        if 'item_num_id' in _kwargs:
            return resolve_offers(_kwargs['item_num_id'])
        return resolve_offers()
