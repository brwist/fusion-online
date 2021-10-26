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
        ('BUYER', 'Buyer'),
        ('COMMODITY_PRODUCT_MANAGER', 'Community/Product Manager'),
        ('MATERIALS_PLANNING', 'Materials Planning'),
        ('IT_MANAGER', 'IT Manager'),
        ('ENGINEER', 'Engineer'),
        ('ACCOUNTS_PAYABLE', 'Accounts Payable'),
        ('SERVICE_TECHNICIAN', 'Service Technician'),
        ('SALES', 'Sales'),
        ('OTHER', 'Other')
    ]
)

class StaffMemberStatus(graphene.Enum):
    ACTIVE = "active"
    DEACTIVATED = "deactivated"
