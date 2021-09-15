from django.db import models
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

class Offer(models.Model):
    type = models.CharField(
        max_length=50,
        blank=True, 
        default="",
        choices=TYPE_CHOICES
    )
    lead_time_days = models.IntegerField(default=-1)
    date_added = models.BigIntegerField(null=True)
    date_code = models.CharField(max_length=50, blank=True, default="")
    comment = models.CharField(max_length=300, blank=True, default="")
    coo = models.CharField(max_length=60, blank=True, default="")
    vendor_type = models.CharField(
        max_length=50,
        blank=True,
        default="",
        choices=VENDOR_TYPE_CHOICES
    )
    vendor_region = models.CharField(
        max_length=50,
        blank=True,
        default="",
        choices=VENDOR_REGION_CHOICES
    )
    tariff_rate = models.FloatField(null=True, blank=True)
    product_variant = models.OneToOneField(
        ProductVariant,
        on_delete=models.CASCADE
    )

    class Meta:
        app_label = "fusion_online"