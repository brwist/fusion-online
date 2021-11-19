import graphene

from ....fusion_online.parts_list import models
from ...core.connection import CountableDjangoObjectType


class PartsList(CountableDjangoObjectType):
    class Meta:
        model = models.PartList
        fields = ("list_name", "roketchip_user", "created_date", "updated_date")
