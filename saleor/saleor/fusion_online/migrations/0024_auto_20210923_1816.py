# Generated by Django 3.1.2 on 2021-09-23 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fusion_online', '0023_merge_20210923_1813'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vendor',
            name='vendor_region',
            field=models.CharField(choices=[('Americas', 'Americas'), ('Asia/Pacific', 'Asia/Pacific'), ('EMEA', 'EMEA'), ('Other', 'Other')], max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='vendor_type',
            field=models.CharField(choices=[('Unclassified', 'Unclassified'), ('Broker', 'Broker'), ('Mfg. Direct', 'Mfg. Direct'), ('OEM/CM Excess', 'OEM/CM Excess'), ('Authorized/Franchise', 'Authorized/Franchise'), ('Expense (non-product)', 'Expense (non-product)'), ('Service', 'Service')], max_length=50, null=True),
        ),
    ]