from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import RFQSubmission, RFQLineItem
from ...account.models import User

class RFQLineItemSerializer(serializers.ModelSerializer):
	fo_rfq_line_item_ref_id = serializers.CharField(source='pk', read_only=True)

	class Meta:
		model = RFQLineItem
		fields = [
			'mpn',
			'mcode',
			'quantity',
			'target',
			'date_code',
			'comment',
			'cipn',
			'commodity_code',
			'offer_id',
			'fo_rfq_line_item_ref_id'
		]

class RFQSubmissionSerializer(serializers.ModelSerializer):
	items = RFQLineItemSerializer(many=True)
	user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
	fo_rfq_ref_id = serializers.CharField(source="pk", read_only=True)

	class Meta:
		model = RFQSubmission
		fields = ['user', 'items', 'fo_rfq_ref_id']
	
	def create(self, validated_data):
		items_data = validated_data.pop('items')
		rfq_submission = RFQSubmission.objects.create(**validated_data)

		for item in items_data:
			RFQLineItem.objects.create(rfq_submission=rfq_submission, **item)

		return rfq_submission