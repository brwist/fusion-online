from django.db import models

class Offer(models.Model):
	type = models.CharField(
		max_length=50,
		blank=True, 
		default="",
		choices=[("excess_list", "Excess List"), ("stock_list", "Stock List"), ("vendor_offer", "Vendor Offer"), ("rms_offfer", "RMS Offer"), ("po", "PO")]
	)
	lead_time_days = models.IntegerField(default=-1)
	date_added = models.DateTimeField(blank=True, null=True)
	date_code = models.CharField(max_length=50, blank=True, default="")
	comment = models.CharField(max_length=300, blank=True, default="")
	vendor_type = models.CharField(max_length=50, blank=True, default="")
	vendor_region = models.CharField(max_length=50, blank=True, default="")