from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from .serializers import OfferSerializer

@api_view(['POST'])
def handler(request):
	data = JSONParser().parse(request)

	serializer = OfferSerializer(data=data)

	try:
		if not serializer.is_valid():
			return JsonResponse(serializer.errors, status=400)
		else:
			return Response({"fo": "offer submitted"})
	except Exception as e:
		return Response({"error": True, "message": str(e)}, status=500)