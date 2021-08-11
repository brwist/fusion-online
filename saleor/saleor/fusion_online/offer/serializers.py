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
    date_code = serializers.CharField(max_length=50, required=False, allow_blank=True, default="")
    comment = serializers.CharField(max_length=500, required=False, allow_blank=True, default="")
    coo = serializers.CharField(max_length=60, required=False, allow_blank=True, default="")
    lead_time_days = serializers.IntegerField(max_value=None, min_value=-1)
    offer_id = serializers.IntegerField(max_value=None, min_value=None)
    vendor_type = serializers.CharField(required=False, allow_blank=True, default="")
    vendor_region = serializers.CharField(required=False, allow_blank=True, default="")
    tariff_rate = serializers.FloatField(required=False, allow_null=True, default=0)  

    def create(self, validated_data):
        # Get product
        product = Product.objects.get(mpn=validated_data["mpn"],item_num_id=validated_data["item_num_id"])
        print("--RETRIEVED PRODUCT--")

        # Get or create variant
        product_variant = ProductVariant.objects.get_or_create(
            sku=validated_data["offer_id"],
            product=product,
            price_amount=validated_data["offer_price"]
        )
        print("--RETRIEVED OR CREATED VARIANT--")

        # get or create vendor attribute value
        attribute_vendor = Attribute.objects.get(slug="vendor")
        try: 
            attribute_vendor_value = AttributeValue.objects.get(
                slug=validated_data["source"],
                attribute=attribute_vendor
            )
            print("--RETRIEVED VENDOR--")
        except AttributeValue.DoesNotExist: 
            attribute_vendor_value = AttributeValue.objects.create(
                name=validated_data["company"],
                slug=validated_data["source"],
                attribute=attribute_vendor
            )
            print("--CREATED NEW VENDOR--")

        # associate vendor attribute value to product variant
        associate_attribute_values_to_instance(product_variant[0], attribute_vendor, attribute_vendor_value)
        print("--ASSOCIATED VENDOR TO VARIANT--")

        # get warehouse and store quantity
        warehouse = Warehouse.objects.get(name="Test Warehouse")
        Stock.objects.create(
            warehouse=warehouse,
            product_variant=product_variant[0],
            quantity=validated_data['quantity'])
        print("--QUANTITY ADDED TO VARIANT--")

        # create offer
        offer_data = {
            "type": validated_data["type"],
            "date_added": validated_data["date_added"],
            "date_code": validated_data["date_code"],
            "comment": validated_data["comment"],
            "vendor_type": validated_data["vendor_type"],
            "vendor_region": validated_data["vendor_region"],
            "lead_time_days": validated_data["lead_time_days"],
            "product_variant": product_variant[0],
            "tariff_rate": validated_data["tariff_rate"]
        }
        print("SAVING OFFER...")
        return Offer.objects.create(**offer_data)
