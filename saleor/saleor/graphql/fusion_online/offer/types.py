import graphene

from ....fusion_online.offer import models
from ...core.connection import CountableDjangoObjectType


class Offer(CountableDjangoObjectType):

    class Meta:
        model = models.Offer
        fields = ("id", "date_added", "lead_time_days",
                  "product_variant", "tariff_rate", "type", "item_num_id", "vendor")


class Vendor(CountableDjangoObjectType):

    class Meta:
        model = models.Vendor
        fields = ("id", "vendor_name", "vendor_number", "vendor_type", "vendor_region")
