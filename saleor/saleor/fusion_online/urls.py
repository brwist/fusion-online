from django.urls import path
from .product import views as product_views
from .offer import views as offer_views
from .rfq import views as rfq_views
from .shipping_address import views as shipping_address_views
from .orders import views as order_views

urlpatterns = [
    path("products", product_views.post_handler),
    path("products/<pk>", product_views.put_handler),
    path("offers", offer_views.handler),
    path("rfqs", rfq_views.post_rfq_submission_handler),
    path("rfqs/<pk>", rfq_views.get_rfq_submission_handler),
    path('ship-to-addresses', shipping_address_views.ShippingAddressDetail.as_view()),
    path('ship-to-addresses/<int:pk>',
         shipping_address_views.ShippingAddressDetail.as_view()),
    path("rfqs/<int:rfq_submission_pk>/responses/<int:rfq_line_item_pk>",
         rfq_views.post_rfq_response_handler),
    path("orders", order_views.get_orders),
    path("orders/<int:pk>", order_views.OrderDetail.as_view())
]
