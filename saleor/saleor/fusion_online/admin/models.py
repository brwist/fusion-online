from django.db import models

STATUS_CHOICES = [
    ("INITIATED", "Initiated"),
    ("RUNNING", "Running"),
    ("COMPLETED", "Completed"),
    ("ERROR", "Error")
]
class ImportRecord(models.Model):
    celery_task_id = models.CharField(blank=True, max_length=200)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True)
    status = models.CharField(
        choices=STATUS_CHOICES,
        default="INITIATED",
        max_length=50
    )
    message = models.JSONField(null=True)
    user_id = models.CharField(blank=True, max_length=200)
    rows_included = models.IntegerField(null=True)
    rows_successfully_processed = models.IntegerField(null=True)
    type = models.CharField(
        choices=[("PRODUCT", "Product")],
        default="PRODUCT",
        max_length=50
    )