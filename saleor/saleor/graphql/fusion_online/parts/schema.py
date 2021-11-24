from saleor.fusion_online.parts_list.models import Parts
import graphene
from graphene_django import DjangoObjectType 


class PartsType(DjangoObjectType): 
    class Meta:
        model = Parts
        fields = "__all__"

class PartQueries(graphene.ObjectType):
    all_part = graphene.List(PartsType)

    def resolve_all_part(self, info, **kwargs):
        return Parts.objects.all()

class PartInput(graphene.InputObjectType):
    id = graphene.ID()
    mpn = graphene.String()   
    mcode = graphene.String()
    master_id = graphene.Int()
    name = graphene.String()
    partlist_id = graphene.Int()


class CreatePart(graphene.Mutation):
    class Arguments:
        part_data = PartInput(required=True)

    part = graphene.Field(PartsType)
    
    @staticmethod
    def mutate(root, info, part_data=None):
        part_instance = Parts( 
            mpn=part_data.mpn,
            mcode=part_data.mcode,
            master_id=part_data.master_id,
            name=part_data.name,
            partlist_id=part_data.partlist_id
            
        )
        part_instance.save()
        return CreatePart(part=part_instance)

class PartMutation(graphene.ObjectType):
    create_part = CreatePart.Field()




class UpdatePart(graphene.Mutation):
    class Arguments:
        part_data = PartInput(required=True)

    part = graphene.Field(PartsType)

    @staticmethod
    def mutate(root, info, part_data=None, id=None):

        part_instance = Parts.objects.get(pk=part_data.id)

        if part_instance:
            part_instance.mpn = part_data.mpn
            part_instance.mcode = part_data.mcode
            part_instance.master_id = part_data.master_id
            part_instance.name = part_data.name
            part_instance.partlist_id = part_data.partlist_id
            part_instance.save()

            return UpdatePart(part=part_instance)
        return UpdatePart(part=None)


class UpdatePartMutation(graphene.ObjectType):
    update_part = UpdatePart.Field()



class DeletePart(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
    
    part = graphene.Field(PartsType)

    @staticmethod
    def mutate(root, info, id):
        part_instance = Parts.objects.get(pk=id)
        part_instance.delete()
          
        return None


 
class DeletePartMutation(graphene.ObjectType):
    delete_part = DeletePart.Field()       