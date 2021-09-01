# Generated by Django 3.1.2 on 2021-08-24 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0047_auto_20200810_1415'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='customer_id',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='address',
            name='ship_to_name',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='address',
            name='ship_to_num',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='address',
            name='ship_via',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='address',
            name='validation_message',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='address',
            name='vat_id',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]