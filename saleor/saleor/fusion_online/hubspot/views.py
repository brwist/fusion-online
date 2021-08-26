from django.http import JsonResponse
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.throttling import UserRateThrottle
from rest_framework.response import Response
from hubspot import HubSpot
# from hubspot.crm.contacts import ApiException

from ...settings import HUBSPOT_API_KEY




@api_view(['GET'])
@throttle_classes([UserRateThrottle])
def handler(request, contact_id):
    try: 
        api_client = HubSpot(api_key=HUBSPOT_API_KEY)
        print('API CLIENT CONFIGURED')
        contact_fetched = api_client.crm.contacts.basic_api.get_by_id(str(contact_id))
        print('CONTACT FETCHED')
        return Response({"contact": contact_fetched.properties})
    # except ApiException as e:
    #     return Response({"error": True, "message": "Exception when requesting contact by id: %s\n" % e}, status=500)
    except Exception as e:
        return Response({"error": True, "message": str(e)}, status=500)



