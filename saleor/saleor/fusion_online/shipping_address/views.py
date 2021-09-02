from rest_framework.views import APIView
from django.db import transaction
from .models import ShippingAddress

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import ShippingAddressSerializer, AddressSerializer
from saleor.account.models import Address, User
from ...account.utils import store_user_address

from saleor.fusion_online.notifications.utils import send_shipping_address_notification


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
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            """
            Associates the newly created address to customer@example.com user
            """
            address = Address.objects.get(pk=serializer.data['id'])
            serializer = AddressSerializer(address)
            # user = User.objects.get(email="customer@example.com")
            # addressType = "shipping"
            # store_user_address(user, address, addressType)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def put(self, request, pk, format=None):
        """
        Expects only a validation_message
        """
        try:
            shipping_address = Address.objects.get(pk=pk)
            validation_message = request.data.get('validation_message')
            shipping_address.validation_message = validation_message
            shipping_address.save()
            serializer = AddressSerializer(shipping_address)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": True, "message": str(e)}, status=500)
