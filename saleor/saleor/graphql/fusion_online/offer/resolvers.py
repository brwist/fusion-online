import graphene

from ....fusion_online.offer import models
from .types import Offer


def resolve_offers(item_num_id=None):
    """
    Lookup Offers based on a product's item_num_id
    """
    if item_num_id:
        return models.Offer.objects.prefetch_related('vendor').filter(item_num_id=item_num_id)
    return models.Offer.objects.prefetch_related('vendor').all()
