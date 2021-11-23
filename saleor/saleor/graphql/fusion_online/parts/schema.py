# from saleor.fusion_online.parts_list.models import Parts
# import graphene
# from graphene_django import DjangoObjectType, DjangoListField 


# class PartsType(DjangoObjectType): 
#     class Meta:
#         model = Parts
#         fields = ['lists_name','roketchip_user']

# class PartQuery(graphene.ObjectType):
#     all_part_list = graphene.List(PartsType)
#     part_list = graphene.Field(PartsType, Parts_id=graphene.Int())

#     def resolve_all_books(self, info, **kwargs):
#         return Parts.objects.all()

#     def resolve_book(self, info, Parts_id):
#         return Parts.objects.get(pk=Parts_id)



# class BookInput(graphene.InputObjectType):
#     id = graphene.ID()
#     mpn = graphene.String()   
#     mcode = graphene.String() 
#     master_id = graphene.Int()
#     name = graphene.String()
#     partlist_id = graphene.Int()


# class CreateBook(graphene.Mutation):
#     class Arguments:
#         book_data = BookInput(required=True)

#     book = graphene.Field(PartsType)

#     @staticmethod
#     def mutate(root, info, book_data=None):
#         book_instance = Parts( 
#             mpn=book_data.mpn,
#             mcode=book_data.mcode,
#             mpn=book_data.mpn,
#             name=book_data.mcode,
#             partlist=book_data.partlist_id
            
#         )
#         book_instance.save()
#         return CreateBook(book=book_instance)

# class PartMutation(graphene.ObjectType):
#     create_book = CreateBook.Field()