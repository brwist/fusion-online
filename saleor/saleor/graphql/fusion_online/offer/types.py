import graphene

from ....fusion_online.offer import models
from ...core.connection import CountableDjangoObjectType


class Offer(CountableDjangoObjectType):
    date_added = graphene.String()
    item_master_id = graphene.String()
    class Meta:
        model = models.Offer
        fields = ("id", "type", "item_type_id", "offer_id", "lead_time_days", "date_added", "item_master_id", "mpn", "mcode",
            "quantity", "offer_price", "date_code", "comment", "coo", "vendor", "product_variant", "tariff_rate")


class Vendor(CountableDjangoObjectType):

    class Meta:
        model = models.Vendor
        fields = ("id", "vendor_name", "vendor_number", "vendor_type", "vendor_region")
