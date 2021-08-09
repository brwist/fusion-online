from django.db import models
from ...product.models import ProductVariant

TYPE_CHOICES = [
	("EXCESS_LIST", "Excess List"),
	("STOCK_LIST", "Stock List"),
	("VENDOR_OFFER", "Vendor Offer"),
	("RMS_OFFER", "RMS Offer"),
	("PO", "PO")]
class Offer(models.Model):
	type = models.CharField(
		max_length=50,
		blank=True, 
		default="",
		choices=TYPE_CHOICES
	)
	lead_time_days = models.IntegerField(default=-1)
	date_added = models.IntegerField(null=True)
	date_code = models.CharField(max_length=50, blank=True, default="")
	comment = models.CharField(max_length=300, blank=True, default="")
	vendor_type = models.CharField(max_length=50, blank=True, default="")
	vendor_region = models.CharField(max_length=50, blank=True, default="")
	tariff_rate = models.FloatField(null=True, blank=True)
	product_variant = models.OneToOneField(
		ProductVariant,
		on_delete=models.CASCADE
	)

	class Meta:
		app_label = "fusion_online"