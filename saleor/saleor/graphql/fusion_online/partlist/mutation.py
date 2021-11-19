import graphene

from .types import PartsList
from ....fusion_online.parts_list.models import PartList
from graphene_django.rest_framework.mutation import SerializerMutation
from .serializers import PartListSerializers

class CreatePlayerMutation(SerializerMutation):
	class Meta:
    	    serializer_class = PartListSerializers


class PartsListMutation(graphene.Mutation):
	class Arguments:
    	    # The input arguments for this mutation
    	    list_name = graphene.String()
    	    roketchip_user = graphene.String()
    	    updated_date = graphene.String()
	# The class attributes define the response of the mutation
	list_of_parts = graphene.Field(PartsList)

	def mutate(self, list_name, roketchip_user, updated_date):
    	    list_of_parts=PartList(list_name=list_name,
                    roketchip_user= roketchip_user,
                    updated_date = updated_date
            )
    	    list_of_parts.save()
    	    # Notice we return an instance of this mutation
    	    return PartsListMutation(list_of_parts=list_of_parts)