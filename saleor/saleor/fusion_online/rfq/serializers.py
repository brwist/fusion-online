from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import RFQSubmission, RFQLineItem
from ...account.models import User

class RFQLineItemSerializer(serializers.ModelSerializer):
	class Meta:
		model = RFQLineItem
		exclude = ['rfq_submission']

class RFQSubmissionSerializer(serializers.ModelSerializer):
	items = RFQLineItemSerializer(many=True)
	user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

	class Meta:
		model = RFQSubmission
		fields = ['user', 'items']
	
	def create(self, validated_data):
		items_data = validated_data.pop('items')
		rfq_submission = RFQSubmission.objects.create(**validated_data)

		for item in items_data:
			RFQLineItem.objects.create(rfq_submission=rfq_submission, **item)

		return rfq_submission