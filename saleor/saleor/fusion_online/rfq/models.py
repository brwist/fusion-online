from django.core.validators import MinValueValidator
from django.db import models
from ...account.models import User
from ..product.serializers import CATEGORY_ID_CHOICES

RFQ_RESPONSE_TYPES_CHOICES = [
    ("OFFER", "Offer"),
    ("NO_BID", "No Bid")
]

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
    commodity_code = models.IntegerField(
        choices=CATEGORY_ID_CHOICES
    )
    rms_response_id = models.IntegerField()
    rfq_submission = models.ForeignKey(
        RFQSubmission,
        related_name="items",
        on_delete=models.CASCADE
    )

    class Meta:
        app_label = "fusion_online"


class RFQResponse(models.Model):
    response = models.CharField(max_length=50, choices=RFQ_RESPONSE_TYPES_CHOICES)
    mpn = models.CharField(max_length=50)
    mcode = models.CharField(max_length=10)
    quantity = models.IntegerField(validators=[MinValueValidator(limit_value=1)])
    offer_price = models.FloatField()
    date_code = models.CharField(max_length=50)
    comment = models.CharField(max_length=300)
    coo = models.CharField(max_length=60)
    lead_time_days = models.CharField(max_length=50)
    rms_response_id = models.IntegerField()
    line_item = models.OneToOneField(RFQLineItem, on_delete=models.CASCADE, related_name="response")

    class Meta:
        app_label = "fusion_online"