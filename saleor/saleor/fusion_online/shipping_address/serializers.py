from rest_framework.serializers import CharField, IntegerField, ModelSerializer, SerializerMethodField
from .models import ShippingAddress


class ShippingAddressSerializer(ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = ['id', 'customer_id', 'ship_to_name', 'address', 'city',
                  'state', 'country', 'ship_via', 'vat_id', 'ship_to_num', 'validation_message']

    address = SerializerMethodField('get_address')
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