from saleor.saleor.fusion_online.parts_list.models import PartList
import graphene
from graphene_django import DjangoObjectType, DjangoListField 


class PartListType(DjangoObjectType): 
    class Meta:
        model = PartList
        fields = "__all__"

class Query(graphene.ObjectType):
    all_part_list = graphene.List(PartListType)
    part_list = graphene.Field(PartListType, partlist_id=graphene.Int())

    def resolve_all_books(self, info, **kwargs):
        return PartList.objects.all()

    def resolve_book(self, info, partlist_id):
        return PartList.objects.get(pk=partlist_id)



class BookInput(graphene.InputObjectType):
    id = graphene.ID()
    roketchip_user = graphene.Int()




class CreateBook(graphene.Mutation):
    class Arguments:
        book_data = BookInput(required=True)

    book = graphene.Field(PartListType)

    @staticmethod
    def mutate(root, info, book_data=None):
        book_instance = PartList( 
            list_name=book_data.list_name,
            roketchip_user=book_data.roketchip_user,
        )
        book_instance.save()
        return CreateBook(partlist=book_instance)
