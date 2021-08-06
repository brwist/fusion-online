import graphene

from ....fusion_online.offer import models
from ...core.connection import CountableDjangoObjectType

class Offer(CountableDjangoObjectType):

	class Meta:
		model = models.Offer
		fields = ("id", "date_added", "lead_time_days", "product_variant", "tariff", "type")