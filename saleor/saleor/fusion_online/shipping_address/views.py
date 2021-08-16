from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from django.db import transaction
from .models import ShippingAddress

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.http import HttpResponse
from django.http import JsonResponse, Http404

from .serializers import ShippingAddressSerializer
from saleor.account.models import Address


class ShippingAddressDetail(APIView):

    def get(self, request, pk, format=None):
        try:
            shipping_address = ShippingAddress.objects.get(pk=pk)
            serializer = ShippingAddressSerializer(shipping_address)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": True, "message": str(e)}, status=500)

    @transaction.atomic
    def post(self, request):
        address = request.data.pop('address')
        address = Address.objects.create(**address)
        data = {**request.data, 'address_id': address.id}
        serializer = ShippingAddressSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        """
        Expects only a ship_to_num and a validation_message
        """
        try:
            shipping_address = ShippingAddress.objects.get(pk=pk)
            ship_to_num = request.data.ship_to_num
            validation_message = request.data.validation_message
            shipping_address.ship_to_num = ship_to_num
            shipping_address.validation_message = validation_message
            shipping_address.save()
            serializer = ShippingAddressSerializer(shipping_address)
            if not serializer.is_valid():
                return JsonResponse(serializer.errors, status=400)
            else:
                return Response(serializer.data)
        except Exception as e:
            return Response({"error": True, "message": str(e)}, status=500)
