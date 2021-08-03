# Generated by Django 3.1.2 on 2021-08-03 19:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(blank=True, choices=[('excess_list', 'Excess List'), ('stock_list', 'Stock List'), ('vendor_offer', 'Vendor Offer'), ('rms_offfer', 'RMS Offer'), ('po', 'PO')], default='', max_length=50)),
                ('lead_time_days', models.IntegerField(default=-1)),
                ('date_added', models.DateTimeField(blank=True, null=True)),
                ('date_code', models.CharField(blank=True, default='', max_length=50)),
                ('comment', models.CharField(blank=True, default='', max_length=300)),
                ('vendor_type', models.CharField(blank=True, default='', max_length=50)),
                ('vendor_region', models.CharField(blank=True, default='', max_length=50)),
            ],
        ),
    ]
