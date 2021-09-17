# Generated by Django 3.1.2 on 2021-09-17 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fusion_online', '0019_auto_20210917_1832'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vendor',
            name='vendor_region',
            field=models.CharField(choices=[('USA', 'USA'), ('ASIA_PACIFIC', 'Asia/Pacific'), ('ASIA', 'Asia'), ('EMEA', 'EMEA'), ('EUROPE', 'Europe'), ('OTHER', 'Other')], default='ASIA', max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='vendor',
            name='vendor_type',
            field=models.CharField(choices=[('UNCLASSIFIED', 'Unclassified'), ('BROKER', 'Broker'), ('MFG_DIRECT', 'Mfg. Direct'), ('OEM_CM_EXCESS', 'OEM/CM Excess'), ('AUTHORIZED_FRANCHISE', 'Authorized/Franchise'), ('EXPENSE_NON_PRODUCT', 'Expense (non-product)'), ('SERVICE', 'Service')], default='UNCLASSIFIED', max_length=50),
            preserve_default=False,
        ),
    ]
