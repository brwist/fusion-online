from rest_framework import serializers
from hubspot import HubSpot
# from hubspot.crm.contacts import ApiException
from ...settings import HUBSPOT_API_KEY

class ContactPropertiesSerializer(serializers.CharField):
    company = serializers.CharField()
    email = serializers.EmailField()
    firstname = serializers.CharField()
    lastname = serializers.CharField()
    phone = serializers.CharField()
    approval_status = serializers.CharField()


class CompanyPropertiesSerializer(serializers.CharField):
    city = serializers.CharField()
    state = serializers.CharField()
    domain = serializers.CharField()
    name = serializers.CharField()
    industry = serializers.CharField()
    phone = serializers.CharField()


class HubspotContactSerializer(serializers.Serializer):
    properties = serializers.DictField(child=ContactPropertiesSerializer())

    def create(self, validated_data):
        api_client = HubSpot(api_key=HUBSPOT_API_KEY)
        print('API CLIENT CONFIGURED')
        api_response = api_client.crm.contacts.basic_api.create(
            simple_public_object_input=validated_data
        )
        print('CONTACT CREATED')

        return api_response.to_dict()

class HubspotCompanySerializer(serializers.Serializer):
    properties = serializers.DictField(child=CompanyPropertiesSerializer())

    def create(self, validated_data):
        api_client = HubSpot(api_key=HUBSPOT_API_KEY)
        print('API CLIENT CONFIGURED')
        api_response = api_client.crm.companies.basic_api.create(
            simple_public_object_input=validated_data
        )
        print('COMPANY CREATED')

        return api_response.to_dict()