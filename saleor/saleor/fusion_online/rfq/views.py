from django.http import JsonResponse
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.throttling import UserRateThrottle
from .serializers import RFQSubmissionSerializer, RFQResponseSerializer
from .models import RFQLineItem, RFQSubmission
from django.db import transaction

@api_view(['POST'])
@throttle_classes([UserRateThrottle])
@transaction.atomic
def post_rfq_submission_handler(request):
    data = JSONParser().parse(request)

    serializer = RFQSubmissionSerializer(data=data)

    try:
        with transaction.atomic():
            if not serializer.is_valid():
                return JsonResponse(serializer.errors, status=400)
            else:
                result = serializer.save()
                return Response({"fo_rfq_ref_id": result.pk})
    except Exception as e:
        return Response({"error": True, "message": str(e)}, status=500)


@api_view(["GET"])
@throttle_classes([UserRateThrottle])
def get_rfq_submission_handler(request, pk):
    try:
        rfq_submission = RFQSubmission.objects.get(pk=pk)
    except RFQSubmission.DoesNotExist:
        return Response({"error": True, "message": "RFQ does not exist"}, status=status.HTTP_404_NOT_FOUND)

    try:
        serializer = RFQSubmissionSerializer(rfq_submission)
        return JsonResponse(serializer.data)
    except Exception as e:
        return Response({"error": True, "message": str(e)}, status=500)


@api_view(['POST'])
@throttle_classes([UserRateThrottle])
@transaction.atomic
def post_rfq_response_handler(request, rfq_submission_pk, rfq_line_item_pk):
    data = JSONParser().parse(request)
    data['line_item'] = rfq_line_item_pk

    serializer = RFQResponseSerializer(data=data)

    try:
        with transaction.atomic():
            if not serializer.is_valid():
                return JsonResponse(serializer.errors, status=400)
            else:
                serializer.save()
                return Response({})
    except Exception as e:
        return Response({"error": True, "message": str(e)}, status=500)