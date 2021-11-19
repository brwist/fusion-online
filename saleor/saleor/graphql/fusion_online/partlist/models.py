from django.db import models

class PartList(models.Model):
    list_name = models.CharField(max_length=50)
    roketchip_user = models.ForeignKey(
       "account.user", on_delete=models.CASCADE
    )  # relation with current logged in user
    created_date = models.DateField(auto_now=True)
    updated_date = models.DateField(null=True)