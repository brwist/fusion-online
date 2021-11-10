from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from ...product.models import Product, Attribute, AttributeValue
from ...product.utils.attributes import associate_attribute_values_to_instance
from django.utils.text import slugify
from .tasks import test_task
from .models import ImportRecord
import csv

def decode_utf8(input_iterator):
    for l in input_iterator:
        yield l.decode('utf-8')

def upload_file(request):
    try:
        if request.method == 'POST':
            import_record = ImportRecord.objects.create()
            product_data = list(csv.DictReader(decode_utf8(request.FILES['product_list_csv'])))
            test_task.delay(product_data, import_record.pk)
            return HttpResponse(import_record.pk)
        else:
            return HttpResponseRedirect('/')
    except Exception as e:
        import_record.status = 'ERROR'
        import_record.message = {"error": str(e)}
        import_record.save()
        return HttpResponse(f'error: {str(e)}', status=500)    