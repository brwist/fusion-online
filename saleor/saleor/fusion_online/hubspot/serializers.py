from rest_framework import serializers

class PropertiesSerializer(serializers.CharField):
    company = serializers.CharField()
    email = serializers.EmailField()
    firstname = serializers.CharField()
    lastname = serializers.CharField()
    phone = serializers.CharField()

class HubspotContactSerializer(serializers.Serializer):
    properties = serializers.DictField(child=PropertiesSerializer())