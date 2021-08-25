from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from django.db import transaction
from .models import ShippingAddress

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.http import HttpResponse
from django.http import JsonResponse, Http404

from .serializers import ShippingAddressSerializer, AddressSerializer
from saleor.account.models import Address, User
from ...account.utils import store_user_address

from saleor.fusion_online.notifications.utils import send_shipping_address_notification


class ShippingAddressDetail(APIView):

    def get(self, request, pk, format=None):
        try:
            shipping_address = Address.objects.get(pk=pk)
            serializer = AddressSerializer(shipping_address)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": True, "message": str(e)}, status=500)

    @transaction.atomic
    def post(self, request):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            """
            Associates the newly created address to customer@example.com user
            """
            # address = Address.objects.get(pk=serializer.data['id'])
            # user = User.objects.get(email="customer@example.com")
            # addressType = "shipping"
            # store_user_address(user, address, addressType)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        """
        Expects only a ship_to_num and a validation_message
        """
        try:
            shipping_address = Address.objects.get(pk=pk)
            ship_to_num = request.data.get('ship_to_num')
            validation_message = request.data.get('validation_message')
            shipping_address.ship_to_num = ship_to_num
            shipping_address.validation_message = validation_message
            shipping_address.save()
            serializer = AddressSerializer(shipping_address)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": True, "message": str(e)}, status=500)
