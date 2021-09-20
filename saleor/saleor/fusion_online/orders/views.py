from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction

from saleor.order.models import Order
from rest_framework.views import APIView

from .serializers import SalesOrderSerializer

from saleor.fusion_online.notifications.utils import send_shipping_address_notification, send_sales_order_notification


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
        'entered_by_hubspot_owner_id': entered_by,
        'ship_to': ship_to_address,
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

@api_view(['POST'])
def create_order(request):
    try:
        serializer = SalesOrderSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            # Send sns
            send_sales_order_notification(serializer.data)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serializer.errors, status=400)
    except Exception as e:
        return Response({"error": True, "message": str(e)}, status=500)

class OrderDetail(APIView):

    def get(self, request, pk, format=None):
        try:        
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"error": True, "message": "Order does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            serializer = SalesOrderSerializer(order)
            return JsonResponse(serializer.data)
        except Exception as e:
            return Response({"error": True, "message": str(e)}, status=500)
