from django.http import JsonResponse
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.throttling import UserRateThrottle
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from hubspot import HubSpot
from hubspot.crm.contacts import SimplePublicObjectInput

from ...settings import HUBSPOT_API_KEY

from .serializers import HubspotContactSerializer, HubspotCompanySerializer

from hubspot.utils.webhooks import validate_signature
from hubspot.exceptions import InvalidSignatureError
from django.conf import settings

from saleor.account.models import User
import requests


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


def install_webhook(request):

    code = request.GET.get('code')
    payload = {
        'grant_type': 'authorization_code',
        'client_id': settings.HUBSPOT_CLIENT_ID,
        'client_secret': settings.HUBSPOT_CLIENT_SECRET,
        'redirect_uri': settings.HUBSPOT_OAUTH_REDIRECT_URL,
        'code': code
    }
    r = requests.post('https://api.hubapi.com/oauth/v1/token', data=payload, headers={
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    resp = r.json()
    return JsonResponse({'message': 'ok'})


def update_contact_approval_status(request):
    try:
        validate_signature(
            signature=request.headers["X-HubSpot-Signature"],
            signature_version=request.headers["X-HubSpot-Signature-Version"],
            http_uri='',
            request_body=request.body.decode("utf-8"),
            client_secret=settings.HUBSPOT_CLIENT_SECRET
        )
        data = JSONParser().parse(request)[0]
        if data['propertyName'] != 'customer_approval_status_rc':
            raise Exception(
                'Incorrect property passed on webhook. Passed ' + data['propertyName'])
        new_approval_status = data['propertyValue']
        matches = User.objects.filter(
            private_metadata__hubspot_user_id=str(data['objectId']))
        user = matches[0]
        user.private_metadata['customer_approval_status'] = new_approval_status
        return JsonResponse({'message': 'ok'})
    except InvalidSignatureError:
        print("Request signature is not valid")
