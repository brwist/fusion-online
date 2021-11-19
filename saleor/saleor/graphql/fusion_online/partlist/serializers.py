from django.db import models
from django.db.models import fields
from rest_framework import serializers
from ....fusion_online.parts_list.models import PartList




class PartListSerializers(serializers.ModelSerializer):
    class Meta:
        model = PartList
        fields = ['list_name','roketchip_user','created_date','updated_date']
