from django.db import models

from saleor.account.models import User
from saleor.product.models import Product

class Rfq(models.Model):
    user = models.ForeignKey(
        User, related_name="rfqs", on_delete=models.CASCADE 
    )
    
    created_at = models.DateTimeField(auto_now_add=True)

    def set_user(self, user):
        self.user = user
        self.save()

class RfqItem(models.Model):
    rfq = models.ForeignKey(
        Rfq, related_name="items", on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product, related_name="rfq_items", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    objects = models.QuerySet.as_manager()

    class Meta:
        unique_together = ("rfq", "product")

    def __str__(self):
        return "RfqItem (%s, %s)" % (self.rfq.user, self.product)