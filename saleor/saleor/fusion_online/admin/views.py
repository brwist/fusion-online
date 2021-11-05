from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from .forms import UploadFileForm
import csv

def decode_utf8(input_iterator):
    for l in input_iterator:
        yield l.decode('utf-8')

def upload_file(request):
    print("request files", request.FILES)
    if request.method == 'POST':
        product_data = csv.DictReader(decode_utf8(request.FILES['product_list_csv']))
        for row in product_data:
            print(row)

        return HttpResponse("success")
    else:
        return HttpResponseRedirect('/')