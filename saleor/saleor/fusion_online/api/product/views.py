from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from .serializers import ProductSerializer

@api_view(["POST"])
def handler(request):
    data = JSONParser().parse(request)

    serializer = ProductSerializer(data=data)
    try:
        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=400)
        else:
            result = serializer.save()
            return Response({"fo_ref_id": result.pk})
    except Exception as e:
        return Response({"error": True, "message": str(e)}, status=500)
