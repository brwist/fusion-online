import graphene
from ...core.connection import CountableDjangoObjectType
from ..partlist import models
from graphene import relay

class Parts(CountableDjangoObjectType):
    list_name = graphene.String(description="Add the list name")
    roketchip_user  = graphene.Int(description="Add the user")
    class Meta:
        interfaces = [relay.Node]
        only_fields = ["id", "list_name", "roketchip_user"]
        model = models.PartList
