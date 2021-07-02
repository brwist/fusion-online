from rest_framework import serializers

class OfferSerializer(serializers.Serializer):
	type = serializers.CharField()
	date_added = serializers.IntegerField(max_value=None, min_value=None)
	source = serializers.IntegerField(max_value=None, min_value=None)
	company = serializers.CharField(max_length=50)
	item_num_id = serializers.IntegerField(max_value=None, min_value=None)
	mpn = serializers.CharField(max_length=50)
	mcode = serializers.CharField(max_length=10)
	qty = serializers.IntegerField(max_value=None, min_value=0)
	offer_price = serializers.CharField(max_length=20)
	date_code = serializers.CharField(max_length=50, required=False)
	comment = serializers.CharField(max_length=500, required=False)
	coo = serializers.CharField(max_length=60, required=False)
	lead_time_days = serializers.IntegerField(max_value=None, min_value=-1)
	offer_id = serializers.IntegerField(max_value=None, min_value=None, required=False)
	vendor_type = serializers.CharField()
	vendor_region = serializers.CharField()  


