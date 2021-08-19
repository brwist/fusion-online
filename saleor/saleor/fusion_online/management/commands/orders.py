from django.core.management.base import BaseCommand, CommandError

import json
import requests
from django.conf import settings
import os
import sys
import subprocess
from django.core.management import execute_from_command_line

from saleor.account.models import Address, User
from saleor.order.models import Order
from saleor.checkout.models import Checkout, CheckoutLine
from saleor.product.models import ProductVariant

from saleor.fusion_online.orders.serializers import CheckoutSerializer
from saleor.fusion_online.shipping_address.models import ShippingAddress

from saleor.graphql.order.resolvers import resolve_order_by_token

from saleor.fusion_online.notifications.utils import send_shipping_address_notification


class Command(BaseCommand):
    help = 'Run some order tests'

    def __init__(self):
        super(Command, self).__init__()
        api_key = settings.API_KEY
        self.use_graph_ql = True

        if not api_key:
            raise CommandError('API_KEY not set!')

    def handle(self, *args, **options):
        self.reset_db()
        self.create_ship_to_address()
        self.receive_updated_ship_to_address()
        checkout_id = self.create_checkout()
        self.update_shipping_method(checkout_id)
        self.update_billing(checkout_id)
        self.create_payment(checkout_id)
        order = self.complete_checkout(checkout_id)
        self.modify_order_address(order)

    def reset_db(self):
        if not settings.DEBUG:
            return
        # orders = Order.objects.all()
        # count = 0
        # for order in orders:
        #     order.delete()
        #     count += 1
        # print('%d orders deleted', count)

        reset_db_path = os.path.join(os.path.dirname(
            settings.BASE_DIR), 'scripts', 'seed_db.sh')
        subprocess.run(reset_db_path)
        execute_from_command_line(['manage.py', 'migrate'])

        shipping_addresses = Address.objects.filter(city="Miami")
        count = 0
        for addr in shipping_addresses:
            addr.delete()
            count += 1
        print('%d addresses deleted', count)

        checkouts = Checkout.objects.all()
        count = 0
        for checkout in checkouts:
            checkout.delete()
            count += 1
        print('%d checkouts deleted', count)
        return

    def create_ship_to_address(self):
        json_path = os.path.join(os.path.dirname(
            __file__), 'json', 'create_shipping_address.json')
        json_data = open(json_path)
        payload = json.load(json_data)

        url = "http://127.0.0.1:7000/fo-api/ship-to-addresses"
        r = requests.post(url, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Api-Key ' + settings.API_KEY
            }))
        if r.status_code != 201:
            print(r.text)
            sys.exit()
        shipping_address = r.json()
        self.shipping_address = shipping_address

        # Trigger SNS
        send_shipping_address_notification(shipping_address.get('id'))

        # Load test user to associate address
        address_id = shipping_address['address']['id']
        address = Address.objects.get(pk=address_id)
        self.address = address
        user = User.objects.get(pk=5)
        user.default_shipping_address = address
        user.save()

    def receive_updated_ship_to_address(self):
        json_path = os.path.join(os.path.dirname(
            __file__), 'json', 'update_shipping_address.json')
        json_data = open(json_path)
        payload = json.load(json_data)
        url = "http://127.0.0.1:7000/fo-api/ship-to-addresses/" + \
            str(self.shipping_address.get('id'))
        r = requests.put(url, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Api-Key ' + settings.API_KEY
            }))
        shipping_address = r.json()
        self.shipping_address = shipping_address

        # Refresh parent address obj
        address_id = shipping_address['address']['id']
        address = Address.objects.get(pk=address_id)
        self.address = address

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
        return order[0]['data']['checkoutComplete']['order']

    def modify_order_address(self, order):
        token = order['token']
        order = resolve_order_by_token(token)

        order.shipping_address = self.address
        order.save()

        self.stdout.write(self.style.SUCCESS(
            'Successfully modified order address for order "%s"' % order.id))
        return
