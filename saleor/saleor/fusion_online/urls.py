from django.urls import path
from .product import views as product_views
from .offer import views as offer_views
from .shipping_address import views as shipping_address_views

urlpatterns = [
    path("products", product_views.post_handler),
    path("products/<pk>", product_views.put_handler),
    path("offers", offer_views.handler),
    path('ship-to-addresses/<int:ship_to_num>',
         shipping_address_views.ShippingAddressDetail.as_view())
]
