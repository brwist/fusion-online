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

class BookInputParts(graphene.InputObjectType):
    id = graphene.ID()
    mpn = graphene.String()   
    mcode = graphene.String()
    master_id = graphene.Int()
    name = graphene.String()
    partlist_id = graphene.Int()


class CreatePart(graphene.Mutation):
    class Arguments:
        book_data = BookInputParts(required=True)

    book = graphene.Field(PartsType)
    
    @staticmethod
    def mutate(root, info, book_data=None):
        book_instance = Parts( 
            mpn=book_data.mpn,
            mcode=book_data.mcode,
            master_id=book_data.master_id,
            name=book_data.name,
            partlist_id=book_data.partlist_id
            
        )
        book_instance.save()
        return CreatePart(book=book_instance)

class PartMutation(graphene.ObjectType):
    create_part = CreatePart.Field()




class UpdatePart(graphene.Mutation):
    class Arguments:
        book_data = BookInputParts(required=True)

    book = graphene.Field(PartsType)

    @staticmethod
    def mutate(root, info, book_data=None, id=None):

        book_instance = Parts.objects.get(pk=book_data.id)

        if book_instance:
            book_instance.mpn = book_data.mpn
            book_instance.mcode = book_data.mcode
            book_instance.master_id = book_data.master_id
            book_instance.name = book_data.name
            book_instance.partlist_id = book_data.partlist_id
            book_instance.save()

            return UpdatePart(book=book_instance)
        return UpdatePart(book=None)


class UpdatePartMutation(graphene.ObjectType):
    update_part = UpdatePart.Field()



class DeletePart(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
    
    book = graphene.Field(PartsType)

    @staticmethod
    def mutate(root, info, id):
        book_instance = Parts.objects.get(pk=id)
        book_instance.delete()
          
        return None


 
class DeletePartMutation(graphene.ObjectType):
    delete_part = DeletePart.Field()       