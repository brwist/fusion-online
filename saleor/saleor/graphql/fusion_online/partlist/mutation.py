import graphene
from django.core.exceptions import ValidationError
from ...core.mutations import ModelMutation
from ..partlist import models

class PartsListInput(graphene.InputObjectType):
    list_name = graphene.String(description="Name of the list.", required=True)
    roketchip_user = graphene.Int(
        description="We need to insert user id",
		required=True
    )
	

class PartsListCreate(ModelMutation):
    class Arguments:
        input = PartsListInput(
            required=True, description="Fields required to create a menu."
        )

    class Meta:
        description = "Creates a new partlist."
        model = models.PartList
    
    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        return cleaned_input

    @classmethod
    def _save_m2m(cls, info, instance, cleaned_data):
        super()._save_m2m(info, instance, cleaned_data)
        