from django.core.management.base import BaseCommand, CommandError

import json
import requests
from django.conf import settings
import os


class Command(BaseCommand):
    help = 'Run some order tests'

    def __init__(self):
        super(Command, self).__init__()
        api_key = settings.API_KEY

        if not api_key:
            raise CommandError('API_KEY not set!')

    def handle(self, *args, **options):
        checkout_id = self.create_checkout()
        self.update_shipping_method(checkout_id)
        self.update_billing(checkout_id)
        self.create_payment(checkout_id)
        self.complete_checkout(checkout_id)

    def create_checkout(self):
        json_path = os.path.join(os.path.dirname(
            __file__), 'json', 'create_checkout.json')
        json_data = open(json_path)
        payload = json.load(json_data)
        url = settings.GRAPH_QL_URL
        r = requests.post(url, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Api-Key ' + settings.API_KEY
            }))
        resp = r.json()

        checkout_id = resp[0]['data']['checkoutCreate']['checkout']['id']
        return checkout_id

    def update_shipping_method(self, checkout_id):
        json_path = os.path.join(os.path.dirname(
            __file__), 'json', 'shipping_method.json')
        json_data = open(json_path)
        payload = json.load(json_data)
        payload[0]['variables']['checkoutId'] = checkout_id
        url = settings.GRAPH_QL_URL
        r = requests.post(url, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Api-Key ' + settings.API_KEY
            }))
        resp = r.json()

    def update_billing(self, checkout_id):
        json_path = os.path.join(os.path.dirname(
            __file__), 'json', 'update_billing.json')
        json_data = open(json_path)
        payload = json.load(json_data)
        payload[0]['variables']['checkoutId'] = checkout_id
        url = settings.GRAPH_QL_URL
        r = requests.post(url, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Api-Key ' + settings.API_KEY
            }))
        resp = r.json()

    def create_payment(self, checkout_id):
        json_path = os.path.join(os.path.dirname(
            __file__), 'json', 'create_payment.json')
        json_data = open(json_path)
        payload = json.load(json_data)
        payload[0]['variables']['checkoutId'] = checkout_id
        url = settings.GRAPH_QL_URL
        r = requests.post(url, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Api-Key ' + settings.API_KEY
            }))
        resp = r.json()

    def complete_checkout(self, checkout_id):
        json_path = os.path.join(os.path.dirname(
            __file__), 'json', 'complete_checkout.json')
        json_data = open(json_path)
        payload = json.load(json_data)
        payload[0]['variables']['checkoutId'] = checkout_id
        url = settings.GRAPH_QL_URL
        r = requests.post(url, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Api-Key ' + settings.API_KEY
            }))
        resp = r.json()
        order = resp
