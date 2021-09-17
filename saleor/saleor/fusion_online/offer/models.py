from django.core.validators import MinValueValidator
from django.db import models
from django.db.models.deletion import SET_NULL
from ...product.models import ProductVariant

TYPE_CHOICES = [
    ("EXCESS_LIST", "Excess List"),
    ("STOCK_LIST", "Stock List"),
    ("VENDOR_OFFER", "Vendor Offer"),
    ("RMS_OFFER", "RMS Offer"),
    ("PO", "PO")]

VENDOR_TYPE_CHOICES = [
    ("UNCLASSIFIED", "Unclassified"),
    ("BROKER", "Broker"),
    ("MFG_DIRECT", "Mfg. Direct"),
    ("OEM_CM_EXCESS", "OEM/CM Excess"),
    ("AUTHORIZED_FRANCHISE", "Authorized/Franchise"),
    ("EXPENSE_NON_PRODUCT", "Expense (non-product)"),
    ("SERVICE", "Service")
]

VENDOR_REGION_CHOICES = [
    ("USA", "USA"),
    ("ASIA_PACIFIC", "Asia/Pacific"),
    ("ASIA", "Asia"),
    ("EMEA", "EMEA"),
    ("EUROPE", "Europe"),
    ("OTHER", "Other")
]


class Vendor(models.Model):
    vendor_name = models.CharField(max_length=150)
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
        blank=True, 
        default="",
        choices=TYPE_CHOICES
    )
    offer_id = models.IntegerField()
    lead_time_days = models.IntegerField(default=-1)
    date_added = models.BigIntegerField(null=True)
    item_num_id = models.BigIntegerField()
    mpn = models.CharField(max_length=50)
    mcode = models.CharField(max_length=50)
    quantity = models.IntegerField(MinValueValidator(limit_value=0))
    offer_price = models.DecimalField(max_digits=15, decimal_places=5)
    date_code = models.CharField(max_length=50, blank=True, default="")
    comment = models.CharField(max_length=300, blank=True, default="")
    coo = models.CharField(max_length=60, blank=True, default="")
    vendor = models.ForeignKey(
        Vendor,
        related_name="offers",
        null=True,
        on_delete=SET_NULL
    )
    tariff_rate = models.DecimalField(
        max_digits=10,
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
    

