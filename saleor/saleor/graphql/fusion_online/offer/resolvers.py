import graphene

from ....fusion_online.offer import models
from .types import Offer


def resolve_offers(item_master_id=None):
    """
    Lookup Offers based on a product's item_master_id
    """
    if item_master_id:
        return models.Offer.objects.prefetch_related('vendor').filter(item_master_id=item_master_id)
    return models.Offer.objects.prefetch_related('vendor').all()
