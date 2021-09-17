from enum import unique
from django.db.models import fields
from rest_framework import serializers
from ..offer.models import Offer, Vendor, VENDOR_REGION_CHOICES, VENDOR_TYPE_CHOICES

class VendorSerializer(serializers.ModelSerializer):
    vendor_number = serializers.IntegerField(error_messages = {
        "null": "'source' field cannot be null",
        "invalid": "'source' field must be a valid integer"
    })
    company = serializers.CharField(source="vendor_name")
    class Meta:
        model = Vendor
        fields = ['company', 'vendor_number', 'vendor_type', 'vendor_region']
    

class OfferSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Offer
        exclude = ['product_variant']


