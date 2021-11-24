from saleor.fusion_online.parts_list.models import PartLists
import graphene
from graphene_django import DjangoObjectType


class PartListsType(DjangoObjectType): 
    class Meta:
        model = PartLists
        fields = "__all__"

class PartListQueries(graphene.ObjectType):
    all_part_lists = graphene.List(PartListsType)

    def resolve_all_part_lists(self, info, **kwargs):
        if info.context.user.is_anonymous:
            raise Exception('Authentication Failure!')
        return PartLists.objects.filter(rocketchip_user=info.context.user)

class PartListInput(graphene.InputObjectType):
    id = graphene.ID()
    lists_name = graphene.String()   
    rocketchip_user_id = graphene.Int()


class CreatePartList(graphene.Mutation):
    class Arguments:
        part_list_data = PartListInput(required=True)

    partlist = graphene.Field(PartListsType)
    
    @staticmethod
    def mutate(root, info, part_list_data=None):
        if info.context.user.is_anonymous:
            raise Exception('Authentication Failure!')
        partlist_instance = PartLists( 
            lists_name=part_list_data.lists_name,
            rocketchip_user_id=part_list_data.rocketchip_user_id
            
        )
        partlist_instance.save()
        return CreatePartList(partlist=partlist_instance)

class PartListMutation(graphene.ObjectType):
    create_partlist = CreatePartList.Field()




class UpdatePartList(graphene.Mutation):
    class Arguments:
        part_list_data   = PartListInput(required=True)

    partlist = graphene.Field(PartListsType)

    @staticmethod
    def mutate(root, info, part_list_data=None, id=None):
        if info.context.user.is_anonymous:
            raise Exception('Authentication Failure!')
        partlist_instance = PartLists.objects.get(pk=part_list_data.id)

        if partlist_instance:
            partlist_instance.lists_name = part_list_data.lists_name
            partlist_instance.rocketchip_user_id = part_list_data.rocketchip_user_id
            partlist_instance.save()

            return UpdatePartList(partlist=partlist_instance)
        return UpdatePartList(partlist=None)


class UpdatePartListMutation(graphene.ObjectType):
    update_partlist = UpdatePartList.Field()



class DeletePartList(graphene.Mutation):
   
    class Arguments:
        id = graphene.ID()
    
    partlist = graphene.Field(PartListsType)

    @staticmethod
    def mutate(root, info, id):
        if info.context.user.is_anonymous:
            raise Exception('Authentication Failure!')
        partlist_instance = PartLists.objects.get(pk=id)
        partlist_instance.delete()
          
        return None


 
class DeletePartListMutation(graphene.ObjectType):
    delete_partlist = DeletePartList.Field()       