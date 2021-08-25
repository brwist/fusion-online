from rest_framework.serializers import CharField, IntegerField, ModelSerializer, SerializerMethodField, PrimaryKeyRelatedField
from .models import ShippingAddress
from saleor.account.models import Address


class AddressSerializer(ModelSerializer):

    class Meta:
        model = Address
        fields = ['id', 'first_name', 'last_name', 'company_name', 'street_address_1',
                  'street_address_2', 'city', 'city_area', 'postal_code', 'country', 'country_area', 'phone', 'customer_id', 'ship_to_name', 'ship_via', 'vat_id', 'ship_to_num', 'validation_message']


class ShippingAddressSerializer(ModelSerializer):

    class Meta:
        model = ShippingAddress
        fields = ['id', 'address', 'address_id', 'customer_id', 'ship_to_name', 'city',
                  'state', 'country', 'ship_via', 'vat_id', 'ship_to_num', 'validation_message']

    address = SerializerMethodField('get_street_address', read_only=True)
    # address = AddressSerializer(read_only=True)
    address_id = PrimaryKeyRelatedField(
        write_only=True, source='address', queryset=Address.objects.all())
    city = SerializerMethodField('get_city')
    state = SerializerMethodField('get_state')
    country = SerializerMethodField('get_country')

    def get_street_address(self, obj):
        addr1 = obj.address.street_address_1
        addr2 = obj.address.street_address_2
        return addr1 + '\n' + addr2

    def get_city(self, obj):
        return obj.address.city

    def get_state(self, obj):
        return obj.address.country_area

    def get_country(self, obj):
        return obj.address.country.name
