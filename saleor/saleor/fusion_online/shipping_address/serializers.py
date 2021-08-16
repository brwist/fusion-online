from rest_framework.serializers import CharField, IntegerField, ModelSerializer, SerializerMethodField
from .models import ShippingAddress
from saleor.account.models import Address


class AddressSerializer(ModelSerializer):

    class Meta:
        model = Address
        fields = ['id', 'first_name', 'last_name', 'company_name', 'street_address_1',
                  'street_address_2', 'city', 'city_area', 'postal_code', 'country', 'country_area', 'phone']


class ShippingAddressSerializer(ModelSerializer):

    class Meta:
        model = ShippingAddress
        fields = ['id', 'address', 'address_edit', 'customer_id', 'ship_to_name', 'address', 'city',
                  'state', 'country', 'ship_via', 'vat_id', 'ship_to_num', 'validation_message']

    address = SerializerMethodField('get_address', read_only=True)
    address_edit = AddressSerializer(write_only=True)
    city = SerializerMethodField('get_city')
    state = SerializerMethodField('get_state')
    country = SerializerMethodField('get_country')

    def get_address(self, obj):
        addr1 = obj.address.street_address_1
        addr2 = obj.address.street_address_2
        return addr1 + '\n' + addr2

    def get_city(self, obj):
        return obj.address.city

    def get_state(self, obj):
        return obj.address.country_area

    def get_country(self, obj):
        return obj.address.country.name

    def create(self, validated_data):
        address = validated_data.pop('address_edit')
        address = Address.objects.create(**address)
        shipping_address = ShippingAddress.objects.create(
            address_edit=address, **validated_data)

        return shipping_address
