from rest_framework.decorators import api_view
from rest_framework.response import Response

from saleor.order.models import Order


@api_view(['GET'])
def get_orders(request):
    orders = Order.objects.all().prefetch_related('lines')
    response = []
    for order in orders:
        private_metadata = order.private_metadata
        items = []
        for line in order.lines.all():
            unit_price = line.unit_price_gross_amount.to_eng_string()
            item = {
                'item_num_id': 0,
                'cipn': 'test',
                'mpn': 'test',
                'mcode': 'test',
                'quantity': line.quantity,
                'unit_sell_price': unit_price
            }
            items.append(item)
            b = 2
        sales_order = {
            'hubspot_vid': 0,
            'customer_purchase_order_num': order.id,  # This needs to change to customer input
            'entered_by': 0,
            'ship_to_num': 0,
            'due_date': private_metadata.get('due_date'),
            'items': items,
            'fo_order_ref_id': 0,
            'fo_payment_status': 'PREPAID'
        }
        response.append(sales_order)
    return Response(response)
