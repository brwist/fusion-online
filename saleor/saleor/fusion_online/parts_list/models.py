from django.db import models
from enum import auto


# Part list model which will have more than one parts
class PartList(models.Model):
    list_name = models.CharField(max_length=50)
    roketchip_user = models.ForeignKey(
        "account.User", on_delete=models.CASCADE
    )  # relation with current logged in user
    created_date = models.DateField(auto_now=True)
    updated_date = models.DateField()

class Parts(models.Model):
    mpn = models.CharField(max_length=50)
    mcode = models.CharField(max_length=50)
    master_id = models.IntegerField()
    name = models.CharField(max_length=50)
    partlist = models.ForeignKey(
        PartList, on_delete=models.CASCADE
    )  # relation with part list which will have more than one part
         
