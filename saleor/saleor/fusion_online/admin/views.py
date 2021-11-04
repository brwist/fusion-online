from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from .forms import UploadFileForm

def upload_file(request):
    print("in upload handler")
    print("request files", request.FILES)
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)

        return HttpResponse("success")
    else:
        return HttpResponseRedirect('/')