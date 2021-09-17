from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.throttling import UserRateThrottle
from .serializers import OfferSerializer, VendorSerializer
from .models import Vendor
from django.db import transaction

@api_view(['POST'])
@throttle_classes([UserRateThrottle])
@transaction.atomic
def handler(request):
    try: 
        data = JSONParser().parse(request)
        vendor_data = {
            'company': data.pop('company', None),
            'vendor_number': data.pop('source', None),
            'vendor_type': data.pop('vendor_type', None),
            'vendor_region': data.pop('vendor_region', None)
        }
        
        vendor_serializer = VendorSerializer(data=vendor_data)
        
        if vendor_serializer.is_valid():
            vendor = Vendor.objects.get_or_create(vendor_serializer.data)
        else:
            return JsonResponse(vendor_serializer.errors, status=400)

        data['vendor'] = vendor[0].pk
        offer_serializer = OfferSerializer(data=data)
        if offer_serializer.is_valid():
            result = offer_serializer.save()
            return Response({'fo_ref_id': result.pk}, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(offer_serializer.errors, status=400)

    except Exception as e:
        return Response({"error": True, "message": str(e)}, status=500)
