from django.urls import path
from .product import views as product_views
from .offer import views as offer_views

urlpatterns = [
    path("products", product_views.handler),
    path("offers", offer_views.handler)
]