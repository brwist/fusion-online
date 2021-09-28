from django.db.models import Model, CharField, ForeignKey, CASCADE, DateTimeField, BigIntegerField

from ...account.models import Address


class ShippingAddress(Model):
    address = ForeignKey(Address, on_delete=CASCADE,
                         max_length=256, blank=True, null=True, related_name="ship_to_address")
    customer_id = BigIntegerField(blank=True, null=True)
    ship_to_name = CharField(max_length=256, blank=True)
    ship_via = CharField(max_length=256, blank=True, null=True)
    vat_id = CharField(max_length=256, blank=True, null=True)
    ship_to_num = BigIntegerField(blank=True, null=True)
    validation_message = CharField(max_length=256, blank=True, null=True)

    created = DateTimeField(auto_now_add=True, null=True)
    updated = DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.ship_to_name