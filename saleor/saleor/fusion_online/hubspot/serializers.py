from rest_framework import serializers

class ContactPropertiesSerializer(serializers.CharField):
    company = serializers.CharField()
    email = serializers.EmailField()
    firstname = serializers.CharField()
    lastname = serializers.CharField()
    phone = serializers.CharField()


class ContactPropertiesSerializer(serializers.CharField):
    city = serializers.CharField()
    state = serializers.CharField()
    domain = serializers.CharField()
    name = serializers.CharField()
    industry = serializers.CharField()
    phone = serializers.CharField()


class HubspotContactSerializer(serializers.Serializer):
    properties = serializers.DictField(child=ContactPropertiesSerializer())


class HubspotCompanySerializer(serializers.Serializer):
    properties = serializers.DictField()