from rest_framework.serializers import CharField, IntegerField, ModelSerializer, SerializerMethodField, PrimaryKeyRelatedField
from .models import ShippingAddress
from saleor.account.models import Address


class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        fields = ['first_name', 'last_name', 'company_name', 'street_address_1',
                  'street_address_2', 'city', 'city_area', 'postal_code', 'country', 'country_area', 'phone']


class ShippingAddressSerializer(ModelSerializer):
    fo_ship_to_address_ref_id = CharField(source='pk', read_only=True)
    address = SerializerMethodField('get_street_address', read_only=True)
    shipping_address = AddressSerializer(write_only=True)
    city = CharField(source='address.city', read_only=True)
    state = CharField(source='address.country_area', read_only=True)
    country = CharField(source='address.country.name', read_only=True)
    validation_message = CharField(write_only=True)
    hubspot_company_id = IntegerField(source='customer_id', read_only=True)
    

    class Meta:
        model = ShippingAddress
        fields = ['fo_ship_to_address_ref_id', 'customer_id', 'ship_to_name', 'address', 'city',
                  'state', 'country', 'ship_via', 'vat_id', 'validation_message', 'shipping_address']


    def get_street_address(self, obj):
        addr1 = obj.address.street_address_1
        addr2 = obj.address.street_address_2
        return addr1 + ', ' + addr2 if addr2 else addr1


    def create(self, validated_data):
        address_data = validated_data.pop('shipping_address')
        address = Address.objects.create(**address_data)
        shipping_address = ShippingAddress.objects.create(address=address, **validated_data)
        return shipping_address