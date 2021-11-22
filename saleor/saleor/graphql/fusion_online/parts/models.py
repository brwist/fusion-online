from django.db import models
from .models import PartList


class Parts(models.Model):
    mpn = models.CharField(max_length=50)
    mcode = models.CharField(max_length=50)
    master_id = models.IntegerField()
    name = models.CharField(max_length=50)
    partlist = models.ForeignKey(
        PartList, on_delete=models.CASCADE
    )  # relation with part list which will have more than one part
         
