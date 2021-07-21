import graphene

from ....fusion_online.api.offer import models
from .types import Offer

def resolve_offers():
	return models.Offer.objects.all()