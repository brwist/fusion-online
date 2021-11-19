import graphene

from ..partlist import models
from ...core.validators import validate_one_of_args_is_in_query
from .types import Parts


def resolve_part(info, part_id=None, list_name=None, roketchip_user=None):
    validate_one_of_args_is_in_query("id", part_id, "list_name", list_name, "roketchip_user", roketchip_user)
    if part_id:
        return graphene.Node.get_node_from_global_id(info, part_id, Parts)
    if list_name:
        return models.Menu.objects.filter(list_name=list_name).first()
    if roketchip_user:
        return models.Menu.objects.filter(roketchip_user=roketchip_user).first()


