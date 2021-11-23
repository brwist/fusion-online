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
        return PartLists.objects.all()

class BookInput(graphene.InputObjectType):
    id = graphene.ID()
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




class UpdatePartList(graphene.Mutation):
    class Arguments:
        book_data = BookInput(required=True)

    book = graphene.Field(PartListsType)

    @staticmethod
    def mutate(root, info, book_data=None, id=None):

        book_instance = PartLists.objects.get(pk=book_data.id)

        if book_instance:
            book_instance.lists_name = book_data.lists_name
            book_instance.roketchip_user_id = book_data.roketchip_user_id
            book_instance.save()

            return UpdatePartList(book=book_instance)
        return UpdatePartList(book=None)


class UpdatePartListMutation(graphene.ObjectType):
    update_book = UpdatePartList.Field()



class DeletePartList(graphene.Mutation):
   
    class Arguments:
        id = graphene.ID()
    
    book = graphene.Field(PartListsType)

    @staticmethod
    def mutate(root, info, id):
        book_instance = PartLists.objects.get(pk=id)
        book_instance.delete()
          
        return None


 
class DeletePartListMutation(graphene.ObjectType):
    delete_book = DeletePartList.Field()       