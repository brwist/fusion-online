from enum import auto
from django.db import models

# model which is used to store information of Parts
class Parts(models.Model):
    mpn = models.CharField(max_length=50)
    mcode = models.CharField(max_length=50)
    master_id = models.IntegerField()
    name = models.CharField(max_length=50)
    partlist = models.ForeignKey(
        "list.PartList", on_delete=models.CASCADE
    )  # relation with part list which will have more than one part


# Part list model which will have more than one parts
class PartList(models.Model):
    list_name = models.CharField(max_length=50)
    roketchip_user = models.ForeignKey(
        "account.User", on_delete=models.CASCADE
    )  # relation with current logged in user
    created_date = models.DateField(auto_now=True, auto_now_add=True)
    updated_date = models.DateField()
