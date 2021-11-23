from saleor.fusion_online.parts_list.models import PartLists
import graphene
from graphene_django import DjangoObjectType 


class PartListsType(DjangoObjectType): 
    class Meta:
        model = PartLists
        fields = ('lists_name','roketchip_user')

class PartListQuery(graphene.ObjectType):
    all_part_list = graphene.List(PartListsType)
    part_list = graphene.Field(PartListsType, PartLists_id=graphene.Int())

    def resolve_all_books(self, info, **kwargs):
        return PartLists.objects.all()

    def resolve_book(self, info, PartLists_id):
        return PartLists.objects.get(pk=PartLists_id)



class BookInput(graphene.InputObjectType):
    lists_name = graphene.String()   
    roketchip_user_id = graphene.Int()


class CreateBook(graphene.Mutation):
    class Arguments:
        book_data = BookInput(required=True)

    book = graphene.Field(PartListsType)
    
    @staticmethod
    def mutate(root, info, book_data=None):
        book_instance = PartLists( 
            lists_name=book_data.lists_name,
            roketchip_user_id=book_data.roketchip_user_id
            
        )
        book_instance.save()
        return CreateBook(book=book_instance)

class PartListMutation(graphene.ObjectType):
    create_book = CreateBook.Field()