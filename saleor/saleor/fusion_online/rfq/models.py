from django.core.validators import MinValueValidator
from django.db import models
from ...account.models import User

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
    quantity = models.IntegerField(null=True)
    target = models.FloatField()
    date_code = models.CharField(max_length=50, null=True)
    comment = models.CharField(max_length=500)
    cipn = models.CharField(max_length=50)
    """
    commodity_code values map for reference:

    10000000             Memory DRAM Discrete
    10100000             SRAM
    11000000             Memory Modules Desktop
    12000000             Memory Modules Notebook
    12100000             Memory Modules Server
    12200000             eMCP
    13000000             Flash Nand
    13100000             Flash Nor/EPROM
    20000000             CPU Desktop
    21000000             CPU Notebook
    22000000             CPU Server
    23000000             Chipset
    30000000             Semi Lin Log Discrete
    31000000             Passives
    32000000             MPU/PLD
    50000000             Finished Goods General
    60000000             Storage Hard Drives
    61000000             Optical Disk Drives
    62000000             Storage Solid State Drives
    70000000             Displays
    99999999             DEFAULT
    """
    commodity_code = models.IntegerField()
    rms_response_id = models.IntegerField(null=True)
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
    description = models.CharField(max_length=300)
    coo = models.CharField(max_length=60, null=True)
    lead_time_days = models.CharField(max_length=50)
    rms_response_id = models.IntegerField(null=True)
    notes = models.TextField(null=True)
    line_item = models.OneToOneField(RFQLineItem, on_delete=models.CASCADE, related_name="response")

    class Meta:
        app_label = "fusion_online"