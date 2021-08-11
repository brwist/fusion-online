from django.urls import path
from .product import views as product_views
from .offer import views as offer_views
from .rfq import views as rfq_views
from .shipping_address import views as shipping_address_views

urlpatterns = [
    path("products", product_views.post_handler),
    path("products/<pk>", product_views.put_handler),
    path("offers", offer_views.handler),
    path("rfqs", rfq_views.post_handler),
    path("rfqs/<pk>", rfq_views.get_handler),
    path('ship-to-addresses/<int:pk>', shipping_address_views.ShippingAddressDetail.as_view())
]

