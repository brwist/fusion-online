from django.http import JsonResponse
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.throttling import UserRateThrottle
from .serializers import OfferSerializer
from django.db import transaction

@api_view(['POST'])
@throttle_classes([UserRateThrottle])
@transaction.atomic
def handler(request):
	data = JSONParser().parse(request)

	serializer = OfferSerializer(data=data)

	try:
		with transaction.atomic():
			if not serializer.is_valid():
				return JsonResponse(serializer.errors, status=400)
			else:
				result = serializer.save()
				return Response({"fo_ref_id": result.pk})
	except Exception as e:
		return Response({"error": True, "message": str(e)}, status=500)