from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Parts,PartList

class PartsSerializers(serializers.ModelSerializer):
    class Meta:
        model : Parts
        fields = ['mpn','mcode','master_id','name','partlist']