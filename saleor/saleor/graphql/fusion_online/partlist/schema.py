import graphene

from ....fusion_online.parts_list.models import PartList
from .types import PartsList
from .mutation import PartsListMutation
from .serializers import PartListSerializers

class Query(graphene.ObjectType):
    parts_list = graphene.List(PartsList)

    def resolve_parts_list(self, info, **kwargs):
    	    return PartList.objects.all()

class Mutation(graphene.ObjectType):
    
	# add_parts = graphene.Field(PartsListMutation)
    get_parts = graphene.Field(PartListSerializers)

schema = graphene.Schema(query=Query, mutation=Mutation)