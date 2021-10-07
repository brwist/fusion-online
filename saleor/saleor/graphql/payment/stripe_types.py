import graphene
from graphene import relay

from ...payment import models
from ..core.connection import CountableDjangoObjectType
from ..core.types import Money
from .enums import OrderAction, PaymentChargeStatusEnum


class StripeBillingAddress(graphene.ObjectType):
    city = graphene.String()
    country = graphene.String()
    line1 = graphene.String()
    line2 = graphene.String()
    postal_code = graphene.String()
    state = graphene.String()


class StripeBillingDetails(graphene.ObjectType):
    address = graphene.Field(StripeBillingAddress)
    email = graphene.String()
    name = graphene.String()
    phone = graphene.String()


class StripeCardCheck(graphene.ObjectType):

    address_line1_check = graphene.String()
    address_postal_code_check = graphene.String()
    cvc_check = graphene.String()


class StripeNetwork(graphene.ObjectType):

    available = graphene.List(graphene.String)
    preferred = graphene.String()


class Stripe3DSecureUsage(graphene.ObjectType):

    supported = graphene.Boolean()


class StripeCard(graphene.ObjectType):

    brand = graphene.String()
    checks = graphene.Field(StripeCardCheck)
    country = graphene.String()
    exp_month = graphene.String()
    exp_year = graphene.String()
    fingerprint = graphene.String()
    funding = graphene.String()
    generated_from = graphene.String()
    last4 = graphene.String()
    networks = graphene.Field(StripeNetwork)
    three_d_secure_usage = graphene.Field(Stripe3DSecureUsage)
    wallet = graphene.String()


class StripePaymentMethod(graphene.ObjectType):

    class Meta:
        description = (
            "Represents a payment method stored "
            "in Stripe for user, such as credit card."
        )

    id = graphene.String()
    object = graphene.String()
    billing_details = graphene.Field(StripeBillingDetails)
    card = graphene.Field(StripeCard)
    created = graphene.Int()
    customer = graphene.String()
    livemode = graphene.Boolean()
    # metadata = graphene.Field()
    type = graphene.String()
