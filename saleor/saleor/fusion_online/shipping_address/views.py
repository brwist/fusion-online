from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from .models import ShippingAddress

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.http import HttpResponse
from django.http import JsonResponse, Http404

from .serializers import ShippingAddressSerializer


class ShippingAddressDetail(APIView):

    def get(self, request, ship_to_num, format=None):
        try:
            shipping_address = ShippingAddress.objects.get(ship_to_num=ship_to_num)
            serializer = ShippingAddressSerializer(shipping_address)
            if not serializer.is_valid():
                return JsonResponse(serializer.errors, status=400)
            else:
                return Response(serializer.data)
        except Exception as e:
            return Response({"error": True, "message": str(e)}, status=500)

    def put(self, request, ship_to_num, format=None):
        """
        Expects only a ship_to_num and a validation_message
        """
        try:
            shipping_address = ShippingAddress.objects.get(ship_to_num=ship_to_num)
            validation_message = request.data.validation_message
            shipping_address.validation_message = validation_message
            shipping_address.save()
            serializer = ShippingAddressSerializer(shipping_address)
            if not serializer.is_valid():
                return JsonResponse(serializer.errors, status=400)
            else:
                return Response(serializer.data)
        except Exception as e:
            return Response({"error": True, "message": str(e)}, status=500)
