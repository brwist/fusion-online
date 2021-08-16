from django.db.models import Model, CharField, ForeignKey, CASCADE, DO_NOTHING, DateTimeField, BooleanField, Index, IntegerField, TextField, SET_NULL, ManyToManyField

from ...account.models import Address


class ShippingAddress(Model):
    address = ForeignKey(Address, on_delete=CASCADE,
                         max_length=256, blank=True, null=True)
    customer_id = IntegerField(blank=True)
    ship_to_name = CharField(max_length=256, blank=True)
    ship_via = CharField(max_length=256, blank=True)
    vat_id = CharField(max_length=256, blank=True)
    ship_to_num = IntegerField(blank=True)
    validation_message = CharField(max_length=256, blank=True)

    created = DateTimeField(auto_now_add=True, null=True)
    updated = DateTimeField(auto_now=True, null=True)
