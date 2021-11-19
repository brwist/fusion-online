import graphene
from saleor.saleor.fusion_online.parts_list.models import PartList
from .mutation import (
    PartsListCreate
)
from .resolvers import resolve_part
from .types import Parts

class MenuQueries(graphene.ObjectType):
    Parts = graphene.Field(
        Parts,
        id=graphene.Argument(graphene.ID, description="ID of the parts."),
        list_name=graphene.Argument(graphene.String, description="The part's name."),
        roketchip_user=graphene.Argument(graphene.Int, description="The part's user."),
        
    )
    

    def resolve_part(self, info, **data):
        return resolve_part(info, data.get("id"), data.get("list_name"), data.get("roketchip_user"))

class MenuMutations(graphene.ObjectType):
    menu_create = PartsListCreate.Field()
    

