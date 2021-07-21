import graphene

from ....fusion_online.api.offer import models
from ...core.connection import CountableDjangoObjectType

class Offer(CountableDjangoObjectType):

	class Meta:
		model = models.Offer
		fields = ("id", "mpn", "source")