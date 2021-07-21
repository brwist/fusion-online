from django.db import models

class Offer(models.Model):
	source = models.SmallIntegerField()
	company = models.CharField(max_length=50)
	item_num_id = models.IntegerField()
	mpn = models.CharField(max_length=50)
	qty = models.PositiveIntegerField()
	offer_price = models.CharField(max_length=20)
	lead_time_days = models.IntegerField()