import json
import requests

from django.conf import settings


from hubspot import HubSpot
from hubspot.crm.contacts import ApiException

from django.contrib.auth.tokens import default_token_generator
from urllib.parse import urlencode
from saleor.core.utils.url import prepare_url

import datetime
import decimal

from saleor.graphql.core.scalars import Decimal


class HubspotEmails:

    def __init__(self):
        self.api_key = settings.HUBSPOT_API_KEY

        self.single_send_endpoint = 'https://api.hubapi.com/marketing/v3/transactional/single-email/send?hapikey=' + self.api_key

    def prepare_confirmation_url(self, user, redirect_url):
        token = default_token_generator.make_token(user)
        params = urlencode({"email": user.email, "token": token})
        confirm_url = prepare_url(params, redirect_url)
        return confirm_url

    def send_registration_confirmation(self, user, hubspot_user, redirect_url):

        verifyurl = self.prepare_confirmation_url(user, redirect_url)

        print(verifyurl)

        payload = {
            "message": {
                "from": "info@rocketchips.com",
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

    def send_password_reset_link(self, user, hubspot_user, redirect_url):
        reseturl = self.prepare_confirmation_url(user, redirect_url)
        print(reseturl)

        payload = {
            "message": {
                "from": "info@rocketchips.com",
                "to": user.email
            },
            "customProperties": {
                "LinkToConfirmEmailToResetPassword": reseturl,
                "LinkToResetPassword": reseturl
            },
            "emailId": 55511411276
        }

        r = requests.post(self.single_send_endpoint, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json'
            }))
        result = r.json()
        print("hubspot response", result)
        return result

    def send_order_confirmation(self, order):

        to = order.user_email

        order_num = order.private_metadata['customer_purchase_order_num']
        order_date = order.created.strftime(("%m/%d/%Y %I:%M:%S"))

        address = order.shipping_address

        address_output = address.full_name + '<br />' + \
            address.street_address_1 + ' ' + address.street_address_2 \
            + '<br />' + address.city + ', ' + address.country_area + ' ' + address.country.ioc_code

        items = order.items.all()

        items_output = "<table><thead><tr><th>Product</th><th>Qty</th><th>Price</th></tr><tbody>"
        for item in items:
            item_price = item.unit_price_gross_amount * item.quantity
            cents = decimal.Decimal('.01')
            price_decimal = item_price.quantize(cents, decimal.ROUND_HALF_UP)
            price = "$" + price_decimal.to_eng_string()
            items_output += "<tr><td>" + item.product_name + \
                "</td><td>" + str(item.quantity) + "</td><td>" + price + "</td></tr >"

        items_output += "</tbody></table>"

        payload = {
            "message": {
                "from": "info@rocketchips.com",
                "to": "alex@bowst.com"
            },
            "customProperties": {
                "OrderNumber": order_num,
                "OrderDate": order_date,
                "OrderLineItemsWithSummaryAndTerms": items_output,
                "OrderShippingAddress": address_output,
                "linktositelogin": "https://storefront-sandbox.fusiononline.io/"
            },
            "emailId": 54722887344
        }

        r = requests.post(self.single_send_endpoint, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json'
            }))
        result = r.json()
        print("hubspot response", result)
        return result
