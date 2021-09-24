import json
import requests

from django.conf import settings


from hubspot import HubSpot
from hubspot.crm.contacts import ApiException

from django.contrib.auth.tokens import default_token_generator
from urllib.parse import urlencode
from saleor.core.utils.url import prepare_url


class HubspotEmails:

    def __init__(self):
        self.api_key = settings.HUBSPOT_API_KEY

        self.single_send_endpoint = 'https://api.hubapi.com/marketing/v3/transactional/single-email/send?hapikey=' + self.api_key

    def prepare_registration_confirmation_url(self, user, redirect_url):
        token = default_token_generator.make_token(user)
        params = urlencode({"email": user.email, "token": token})
        confirm_url = prepare_url(params, redirect_url)
        return confirm_url

    def send_registration_confirmation(self, user, hubspot_user, redirect_url):

        verifyurl = self.prepare_registration_confirmation_url(user, redirect_url)

        print(verifyurl)

        payload = {
            "message": {
                "from": "info@fusion_online.com",
                "to": user.email,
                "sendId": hubspot_user['id']
            },
            "customProperties": {
                "LinkToVerifyEmail": verifyurl
            },
            "emailId": 55513011793
        }

        r = requests.post(self.single_send_endpoint, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json'
            }))
        result = r.json()
        return result
