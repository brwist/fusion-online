import graphene
from ....fusion_online.shipping_address import models
from ...core.connection import DjangoObjectType


class ShipToAddressInfoInput(graphene.InputObjectType):
    id = graphene.ID(required=False)
    customer_id = graphene.String(description="ID of customer.")
    ship_to_name = graphene.String(description="Given name.")
    ship_via = graphene.String(description="Given name.")
    vat_id = graphene.Int(description="Given name.")
    ship_to_num = graphene.Int(description="Given name.")
    validation_message = graphene.String(description="Given name.")


class ShipToAddressInfo(DjangoObjectType):
    class Meta:
        model = models.ShippingAddress
        fields = ("id", "customer_id", "ship_to_name", "ship_via", "vat_id",
                  "ship_to_num", "validation_message", "created", "updated")
