from django.core.validators import MinValueValidator
from django.db import models
from django.db.models.deletion import SET_NULL
from ...product.models import ProductVariant

TYPE_CHOICES = [
    ("Excess List", "Excess List"),
    ("Stock List", "Stock List"),
    ("Vendor Offer", "Vendor Offer"),
    ("RMS Offer", "RMS Offer"),
    ("RMS PO", "RMS PO")]

VENDOR_TYPE_CHOICES = [
    ("Unclassified", "Unclassified"),
    ("Broker", "Broker"),
    ("Mfg. Direct", "Mfg. Direct"),
    ("OEM/CM Excess", "OEM/CM Excess"),
    ("Authorized/Franchise", "Authorized/Franchise"),
    ("Expense (non-product)", "Expense (non-product)"),
    ("Service", "Service")
]

VENDOR_REGION_CHOICES = [
    ("Americas", "Americas"),
    ("Asia/Pacific", "Asia/Pacific"),
    ("EMEA", "EMEA"),
    ("Other", "Other")
]


class Vendor(models.Model):
    vendor_name = models.CharField(max_length=50)
    vendor_number = models.BigIntegerField(unique=True)
    vendor_type = models.CharField(
        max_length=50,
        choices=VENDOR_TYPE_CHOICES,
        null=True
    )
    vendor_region = models.CharField(
        max_length=50,
        choices=VENDOR_REGION_CHOICES,
        null=True
    )
    
    class Meta:
        app_label = "fusion_online"


class Offer(models.Model):
    type = models.CharField(
        max_length=50,
        choices=TYPE_CHOICES
    )
    offer_id = models.IntegerField(null=True)
    lead_time_days = models.IntegerField(MinValueValidator(limit_value=-1))
    date_added = models.BigIntegerField()
    item_num_id = models.BigIntegerField()
    mpn = models.CharField(max_length=50)
    mcode = models.CharField(max_length=10)
    quantity = models.IntegerField(MinValueValidator(limit_value=1))
    offer_price = models.DecimalField(max_digits=14, decimal_places=5)
    date_code = models.CharField(max_length=50, blank=True, null=True)
    comment = models.CharField(max_length=300, blank=True, null=True)
    coo = models.CharField(max_length=60)
    vendor = models.ForeignKey(
        Vendor,
        related_name="offers",
        null=True,
        on_delete=SET_NULL
    )
    tariff_rate = models.DecimalField(
        max_digits=14,
        decimal_places=5,
        null=True,
        blank=True
    )
    product_variant = models.OneToOneField(
        ProductVariant,
        on_delete=models.CASCADE,
        null=True
    )

    class Meta:
        app_label = "fusion_online"
    

