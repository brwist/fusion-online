# Generated by Django 3.1.2 on 2021-08-09 15:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fusion_online', '0003_auto_20210809_1527'),
    ]

    operations = [
        migrations.RenameField(
            model_name='offer',
            old_name='tariff',
            new_name='tariff_rate',
        ),
    ]