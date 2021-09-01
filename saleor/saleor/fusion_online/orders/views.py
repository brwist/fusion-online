from rest_framework.decorators import api_view
from rest_framework.response import Response

from saleor.order.models import Order
from rest_framework.views import APIView

from saleor.fusion_online.notifications.utils import send_shipping_address_notification


entered_by = 7964957
hubspot_vid = 908051


def sales_order_response_payload(order):
    private_metadata = order.private_metadata
    ship_to_address = order.shipping_address.ship_to_address.get()
    lines = order.lines.all()
    items = []
    for line in order.lines.all():
        unit_price = line.unit_price_gross_amount.to_eng_string()
        product_metadata = line.variant.product.metadata
        item = {
            'item_num_id': product_metadata.get('item_num_id'),
            'cipn': 'test',
            'mpn': product_metadata.get('mpn'),
            'mcode': product_metadata.get('mcode'),
            'quantity': line.quantity,
            'unit_sell_price': unit_price
        }
        items.append(item)
    sales_order = {
        'hubspot_vid': hubspot_vid,
        'customer_purchase_order_num': 123,  # This needs to change to customer input
        'entered_by': entered_by,
        'ship_to_num': ship_to_address.ship_to_num,
        'due_date': private_metadata.get('due_date'),
        'items': items,
        'fo_order_ref_id': order.id,
        'fo_payment_status': 'PREPAID'
    }
    return sales_order


@api_view(['GET'])
def get_orders(request):
    orders = Order.objects.all().prefetch_related(
        'lines', 'shipping_address__ship_to_address')
    response = []
    for order in orders:
        sales_order = sales_order_response_payload(order)
        response.append(sales_order)
    return Response(response)


class OrderDetail(APIView):

    def get(self, request, pk, format=None):
        try:
            order = Order.objects.prefetch_related(
                'lines', 'shipping_address__ship_to_address').get(pk=pk)
            sales_order = sales_order_response_payload(order)
            return Response(sales_order)
        except Exception as e:
            return Response({"error": True, "message": str(e)}, status=500)