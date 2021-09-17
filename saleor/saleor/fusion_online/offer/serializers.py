from enum import unique
from django.db.models import fields
from rest_framework import serializers
from ..offer.models import Offer, Vendor, VENDOR_REGION_CHOICES, VENDOR_TYPE_CHOICES

class VendorSerializer(serializers.ModelSerializer):
    vendor_number = serializers.IntegerField()

    class Meta:
        model = Vendor
        fields = '__all__'
    

class OfferSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Offer
        exclude = ['product_variant']


