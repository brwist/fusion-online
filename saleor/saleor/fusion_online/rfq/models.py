from django.db import models
from ...account.models import User
from ..product.serializers import CATEGORY_ID_CHOICES


class RFQSubmission(models.Model):
	date_added = models.DateTimeField(auto_now_add=True)
	user = models.ForeignKey(
		User,
		related_name="rfqs",
		on_delete=models.CASCADE
	)

	class Meta:
		app_label = "fusion_online"

class RFQLineItem(models.Model):
	mpn = models.CharField(max_length=50)
	mcode = models.CharField(max_length=50)
	quantity = models.IntegerField()
	target = models.FloatField()
	date_code = models.CharField(max_length=50)
	comment = models.CharField(max_length=500)
	cipn = models.CharField(max_length=50)
	commodity_code = models.CharField(
		max_length=50,
		choices=CATEGORY_ID_CHOICES
	)
	offer_id = models.IntegerField()
	rfq_submission = models.ForeignKey(
		RFQSubmission,
		related_name="items",
		on_delete=models.CASCADE
	)

	class Meta:
		app_label = "fusion_online"

