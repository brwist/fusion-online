from django.db import models


class PartLists(models.Model):
    lists_name = models.CharField(max_length=50)
    rocketchip_user = models.ForeignKey("account.User", on_delete=models.CASCADE)
    created_date = models.DateField(auto_now=True)
    updated_date = models.DateField(null=True)


class Parts(models.Model):
    mpn = models.CharField(max_length=50)
    mcode = models.CharField(max_length=50)
    master_id = models.IntegerField()
    name = models.CharField(max_length=50)
    partlist = models.ForeignKey(
        PartLists, on_delete=models.CASCADE,related_name='part'
    )  # relation with part list which will have more than one part
         
            
            