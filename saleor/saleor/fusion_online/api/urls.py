from django.urls import path
from .product import views

urlpatterns = [
    path("products", views.handler)
]