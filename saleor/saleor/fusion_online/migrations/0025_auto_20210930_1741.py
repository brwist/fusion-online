# Generated by Django 3.1.2 on 2021-09-30 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fusion_online', '0024_auto_20210923_1816'),
    ]

    operations = [
        migrations.RenameField(
            model_name='offer',
            old_name='item_num_id',
            new_name='item_master_id',
        ),
        migrations.AddField(
            model_name='offer',
            name='item_type_id',
            field=models.IntegerField(choices=[(0, 'Excess List'), (1, 'Opportunity List'), (2, 'Buyer Offer'), (3, 'Vendor Offer'), (4, 'Stock List'), (5, 'RMS Offer'), (6, 'RMS Req'), (7, 'RMS SO'), (8, 'RMS PO'), (9, 'RMQ Quote')], default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='rfqlineitem',
            name='rms_response_id',
            field=models.IntegerField(null=True),
        ),
    ]
