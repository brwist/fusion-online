# Generated by Django 3.1.2 on 2021-10-20 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fusion_online', '0028_auto_20211006_1859'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rfqresponse',
            old_name='comment',
            new_name='description',
        ),
        migrations.AddField(
            model_name='rfqresponse',
            name='notes',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='rfqlineitem',
            name='date_code',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='rfqlineitem',
            name='quantity',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='rfqresponse',
            name='coo',
            field=models.CharField(max_length=60, null=True),
        ),
        migrations.AlterField(
            model_name='rfqresponse',
            name='rms_response_id',
            field=models.IntegerField(null=True),
        ),
    ]