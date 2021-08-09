from rest_framework import serializers
from ..offer.models import Offer
from ...product.models import Product, ProductVariant, Attribute, AttributeValue
from ...product.utils.attributes import associate_attribute_values_to_instance
from ...warehouse.models import Warehouse, Stock

TYPE_CHOICES = [
	("EXCESS_LIST", "Excess List"),
	("STOCK_LIST", "Stock List"),
	("VENDOR_OFFER", "Vendor Offer"),
	("RMS_OFFER", "RMS Offer"),
	("PO", "PO")]
	
class OfferSerializer(serializers.Serializer):
	type = serializers.ChoiceField(choices=TYPE_CHOICES)
	date_added = serializers.IntegerField(max_value=None, min_value=None)
	source = serializers.IntegerField(max_value=None, min_value=None)
	company = serializers.CharField(max_length=50)
	item_num_id = serializers.IntegerField(max_value=None, min_value=None)
	mpn = serializers.CharField(max_length=50)
	mcode = serializers.CharField(max_length=10)
	quantity = serializers.IntegerField(max_value=None, min_value=0)
	offer_price = serializers.CharField(max_length=20)
	date_code = serializers.CharField(max_length=50, required=False)
	comment = serializers.CharField(max_length=500, required=False)
	coo = serializers.CharField(max_length=60, required=False)
	lead_time_days = serializers.IntegerField(max_value=None, min_value=-1)
	offer_id = serializers.IntegerField(max_value=None, min_value=None)
	vendor_type = serializers.CharField(required=False)
	vendor_region = serializers.CharField(required=False)
	tariff_rate = serializers.FloatField(required=False, allow_null=True)  

	def create(self, validated_data):
		# Get product
		product = Product.objects.get(mpn=validated_data["mpn"],item_num_id=validated_data["item_num_id"])
		print("--Retrieved product--")

		# Get or create variant
		product_variant = ProductVariant.objects.get_or_create(
			sku=validated_data["offer_id"],
			product=product,
			price_amount=validated_data["offer_price"]
		)
		print("--Retrieved or created variant--")

		# get or create vendor attribute value
		attribute_vendor = Attribute.objects.get(slug="vendor")
		attribute_vendor_value = AttributeValue.objects.get_or_create(
			name=validated_data["company"],
			slug=validated_data["source"],
			attribute=attribute_vendor
		)
		print("--Retrieved or created vendor attribute value--")

		# associate vendor attribute value to product variant
		associate_attribute_values_to_instance(product_variant[0], attribute_vendor, attribute_vendor_value[0] )
		print("--Associated vendor attribute value to variant--")

		# get warehouse and store quantity
		warehouse = Warehouse.objects.get(name="Test Warehouse")
		Stock.objects.create(
			warehouse=warehouse,
			product_variant=product_variant[0],
			quantity=validated_data['quantity'])
		print("--Qty Added--")
		# create offer
		offer_data = {
			"type": validated_data["type"],
			"date_added": validated_data["date_added"],
			"date_code": validated_data["date_code"] if validated_data.get('date_code') else "",
			"comment": validated_data["comment"] if validated_data.get('comment') else "",
			"vendor_type": validated_data["vendor_type"] if validated_data.get('vendor_type') else "",
			"vendor_region": validated_data["vendor_region"] if validated_data.get('vendor_region') else "",
			"lead_time_days": validated_data["lead_time_days"],
			"product_variant": product_variant[0],
			"tariff_rate": validated_data["tariff_rate"]
		}
		return Offer.objects.create(**offer_data)
