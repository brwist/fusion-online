from django.http import JsonResponse
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.throttling import UserRateThrottle
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from hubspot import HubSpot
from hubspot.crm.contacts import SimplePublicObjectInput

from ...settings import HUBSPOT_API_KEY

from .serializers import HubspotContactSerializer, HubspotCompanySerializer




@api_view(['GET'])
@throttle_classes([UserRateThrottle])
def get_contact(request, contact_id):
    try: 
        api_client = HubSpot(api_key=HUBSPOT_API_KEY)
        print('API CLIENT CONFIGURED')
        contact_fetched = api_client.crm.contacts.basic_api.get_by_id(str(contact_id))
        print('CONTACT FETCHED')
        return Response({"contact": contact_fetched.to_dict()})
    # except ApiException as e:
    #     return Response({"error": True, "message": "Exception when requesting contact by id: %s\n" % e}, status=500)
    except Exception as e:
        return Response({"error": True, "message": str(e)}, status=500)

@api_view(['POST'])
@throttle_classes([UserRateThrottle])
def create_contact(request):
    try:
        data = JSONParser().parse(request)
        serializer = HubspotContactSerializer(data=data)
        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=400)
        else:
            response = serializer.save()
            return Response({"contact": response})
    except Exception as e:
        return Response({"error": True, "message": str(e)}, status=500)

@api_view(['POST'])
@throttle_classes([UserRateThrottle])
def create_company(request):
    try:
        data = JSONParser().parse(request)
        serializer = HubspotCompanySerializer(data=data)
        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=400)
        else:
            response = serializer.save()
            return Response({"company": response})
    except Exception as e:
        return Response({"error": True, "message": str(e)}, status=500)