from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from ...product.models import Product
import csv

def decode_utf8(input_iterator):
    for l in input_iterator:
        yield l.decode('utf-8')

def upload_file(request):
    try:
        if request.method == 'POST':
            product_data = csv.DictReader(decode_utf8(request.FILES['product_list_csv']))
            for row in product_data:
                item_master_id = int(row['item_master_id'])
                print("--row data--", row)
                try:
                    product = Product.objects.get(metadata__contains={'item_master_id': item_master_id})
                    print("--product--", product)
                except Product.DoesNotExist:
                    return HttpResponse(f'error: No product with item_master_id {item_master_id}', status=400)
            return HttpResponse("success")
        else:
            return HttpResponseRedirect('/')
    except Exception as e:
        return HttpResponse(f'error: {str(e)}', status=500)    