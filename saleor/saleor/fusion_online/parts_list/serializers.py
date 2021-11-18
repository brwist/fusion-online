from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import *


class PartsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Parts
        fields = ['mpn','mcode','master_id','name','partlist']


class PartListSerializers(serializers.ModelSerializer):
    class Meta:
        model = PartList
        fields = ['list_name','roketchip_user','created_date','updated_date']