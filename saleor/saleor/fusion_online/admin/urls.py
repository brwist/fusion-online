from django.urls import path
from . import views as admin_views

urlpatterns = [
    #product-upload
    path("product-upload", admin_views.upload_file)
]
