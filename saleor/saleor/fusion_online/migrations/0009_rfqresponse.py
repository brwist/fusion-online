# Generated by Django 3.1.2 on 2021-08-11 19:14

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fusion_online', '0008_auto_20210811_1811'),
    ]

    operations = [
        migrations.CreateModel(
            name='RFQResponse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('response', models.CharField(choices=[('OFFER', 'Offer'), ('NO_BID', 'No Bid')], max_length=50)),
                ('mpn', models.CharField(max_length=50)),
                ('mcode', models.CharField(max_length=10)),
                ('quantity', models.IntegerField(validators=[django.core.validators.MinValueValidator(limit_value=1)])),
                ('offer_price', models.FloatField()),
                ('date_code', models.CharField(max_length=50)),
                ('comment', models.CharField(max_length=300)),
                ('coo', models.CharField(max_length=60)),
                ('lead_time_days', models.IntegerField(validators=[django.core.validators.MinValueValidator(limit_value=-1)])),
                ('offer_id', models.IntegerField()),
                ('line_item', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='response', to='fusion_online.rfqlineitem')),
            ],
        ),
    ]
