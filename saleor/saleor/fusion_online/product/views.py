from django.http import JsonResponse
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.throttling import UserRateThrottle
from .serializers import ProductSerializer
from django.db import transaction
from ...product.models import Product

@api_view(["POST"])
@throttle_classes([UserRateThrottle])
@transaction.atomic
def post_handler(request):
    print("---------------")
    print('REQUEST_METHOD:', request.META['REQUEST_METHOD'])
    print('PATH_INFO:', request.META['PATH_INFO'])
    print('CONTENT_TYPE:', request.META['CONTENT_TYPE'])
    print('HTTP_AUTHORIZATION:', request.META['HTTP_AUTHORIZATION'])
    print('HTTP_USER_AGENT:', request.META['HTTP_USER_AGENT'])
    print('HTTP_HOST:', request.META['HTTP_HOST'])
    print("---------------")
    data = JSONParser().parse(request)
    print('REQUEST BODY:', data)
    print("---------------")
    serializer = ProductSerializer(data=data)
    try:
        with transaction.atomic():
            if not serializer.is_valid():
                return JsonResponse(serializer.errors, status=400)
            else:
                result = serializer.save()

                return Response({"fo_product_ref_id": result.pk})
    except Exception as e:
        return Response({"error": True, "message": str(e)}, status=500)

@api_view(["PUT"])
@throttle_classes([UserRateThrottle])
@transaction.atomic
def put_handler(request, pk):
    try:
        with transaction.atomic():
            product = Product.objects.get(pk=pk)
            data = JSONParser().parse(request)

            serializer = ProductSerializer(product, data=data, partial=True)
            if not serializer.is_valid():
                return JsonResponse(serializer.errors, status=400)
            else:
                result = serializer.save()
                return Response({"fo_product_ref_id": result.pk})
    except Exception as e:
        return Response({"error": True, "message": str(e)}, status=500)