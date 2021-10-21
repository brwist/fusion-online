import graphene
from django_countries import countries

from ...account import CustomerEvents
from ...checkout import AddressType
from ...graphql.core.enums import to_enum
from ..core.utils import str_to_enum

AddressTypeEnum = to_enum(AddressType, type_name="AddressTypeEnum")
CustomerEventsEnum = to_enum(CustomerEvents)


CountryCodeEnum = graphene.Enum(
    "CountryCode", [(str_to_enum(country[0]), country[0]) for country in countries]
)

JobTitleEnum = graphene.Enum("JobTitle", [
        ('BUYER', 0),
        ('COMMODITY_PRODUCT_MANAGER', 1),
        ('MATERIALS_PLANNING', 2),
        ('IT_MANAGER', 3),
        ('ENGINEER', 4),
        ('ACCOUNTS_PAYABLE', 5),
        ('SERVICE_TECHNICIAN', 6),
        ('SALES', 7),
        ('OTHER', 8)
    ]
)

class StaffMemberStatus(graphene.Enum):
    ACTIVE = "active"
    DEACTIVATED = "deactivated"
