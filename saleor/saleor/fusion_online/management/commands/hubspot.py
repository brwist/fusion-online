from django.core.management.base import BaseCommand, CommandError

import json
import requests
import pprint
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

from hubspot import HubSpot
from hubspot.crm.contacts import SimplePublicObjectInput, ApiException


class Command(BaseCommand):
    help = 'Run some hubspot tests'

    def __init__(self):
        super(Command, self).__init__()
        self.api_key = settings.HUBSPOT_API_KEY
        self.client = HubSpot(api_key=self.api_key)
        self.test_email = "alxvallejo@36creative.com"

        self.test_user = {
            "firstname": "Alex",
            "lastname": "Vallejo",
            "email": self.test_email,
            "company": "36 Creative",
            "customer_approval_status_rc": "Limited"  # property in Hubspot for all new registrations
        }

        self.contacts_endpoint = 'https://api.hubapi.com/crm/v3/objects/contacts?hapikey=' + self.api_key
        self.contacts_search_endpoint = 'https://api.hubapi.com/crm/v3/objects/contacts/search?hapikey=' + self.api_key
        self.companies_search_endpoint = 'https://api.hubapi.com/crm/v3/objects/companies/search?hapikey=' + self.api_key
        self.companies_endpoint = 'https://api.hubapi.com/crm/v3/objects/companies?hapikey=' + self.api_key
        self.contact_properties_endpoint = 'https://api.hubapi.com/crm/v3/properties/contacts/role_rc?hapikey=' + self.api_key

        if not self.api_key:
            raise CommandError('HUBSPOT_API_KEY not set!')

    def handle(self, *args, **options):
        self.reset_db()
        self.reset_user()
        self.reset_company()
        self.register_new_user()

    def format_delete_by_email_url(self, email):
        return 'https://api.hubapi.com/crm/v3/objects/gdpr/contacts/email/' + email + '?hapikey=' + self.api_key

    def format_company_url(self, company_id):
        return 'https://api.hubapi.com/crm/v3/objects/companies/' + str(company_id) + '?hapikey=' + self.api_key

    def format_associations_endpoint(self, type):
        return 'https://api.hubapi.com/crm/v3/associations/contact/company/batch/' + type + '?hapikey=' + self.api_key

    def get_email_domain(self, email):
        parts = email.split('@')
        return parts[1]

    """
    Format the user_fields, along with the email domain, from the registration form
    into a new company payload.
    """

    def format_company_payload(self, name, domain):
        return {
            "name": name
        }

    def reset_db(self):
        if not settings.DEBUG:
            return

        reset_db_path = os.path.join(os.path.dirname(
            settings.BASE_DIR), 'scripts', 'seed_db.sh')
        subprocess.run(reset_db_path)
        execute_from_command_line(['manage.py', 'migrate'])
        return

    def reset_user(self):
        self.stdout.write(self.style.WARNING(
            'Deleting user in hubspot with email "%s"' % self.test_email))
        self.delete_user_by_email(self.test_email)

    def reset_company(self):
        existing_companies = self.check_company(self.test_email)
        if existing_companies['total'] > 0:
            # pick the first
            company = existing_companies['results'][0]
            self.stdout.write(self.style.SUCCESS(
                'Company found and will be deleted: "%s".' % company['properties']['name']))
            self.delete_company(company['id'])

    def delete_user_by_id(self, contact_id):
        try:
            api_response = self.client.crm.contacts.basic_api.archive(
                contact_id=contact_id)
            pprint(api_response)
        except ApiException as e:
            print("Exception when calling basic_api->archive: %s\n" % e)

    def delete_user_by_email(self, email):
        url = self.format_delete_by_email_url(email)
        r = requests.delete(url)
        if r.status_code != 204:
            self.stdout.write(self.style.WARNING(
                'Error deleting hubspot email "%s"' % email))
        else:
            self.stdout.write(self.style.SUCCESS(
                'Successful deletion of hubspot email "%s"' % email))

    """
    Main test number one:
    Create a new user for a new company.
    """

    def register_new_user(self):
        r = self.search_userbase()
        if len(r['results']) > 0:
            self.stdout.write(self.style.WARNING(
                '"%s" hubspot emails found' % str(r['total'])))
        else:
            self.stdout.write(self.style.SUCCESS(
                'No existing hubspot emails found, creating new account in hubspot.'))

            existing_companies = self.check_company(self.test_email)
            if len(existing_companies['results']) > 0:
                # pick the first
                company = existing_companies['results'][0]
                self.stdout.write(self.style.SUCCESS(
                    'Company found: "%s".' % company['properties']['name']))

            else:
                self.stdout.write(self.style.WARNING(
                    'No company found for email "%s". Creating a new company in Hubspot.' % self.test_email))

                company_payload = {
                    "name": self.test_user['company'],
                    "domain": self.get_email_domain(self.test_email)
                }

                company = self.create_company(company_payload)

                # Create user with property role_rc = ADMIN
                user = self.add_user('Admin')
                self.stdout.write(self.style.SUCCESS(
                    'Hubspot user created with user id "%s".' % str(user['id'])))

                # Create the association
                self.associate_company_with_contact(company['id'], user['id'])

                # Determine available contact properties
                # self.check_contact_properties()

    def search_userbase(self):
        payload = {
            "filterGroups": [
                {
                    "filters": [
                        {
                            "propertyName": "email",
                            "operator": "EQ",
                            "value": self.test_email
                        }
                    ]
                }
            ]
        }
        r = requests.post(self.contacts_search_endpoint, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json'
            }))
        results = r.json()
        return results

    def add_user(self, role):
        payload = {
            "properties": {**self.test_user, 'role_rc': role}
        }
        r = requests.post(self.contacts_endpoint, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json'
            }))
        user = r.json()
        return user

    def check_company(self, email):
        email_domain = self.get_email_domain(email)
        payload = {
            "filterGroups": [
                {
                    "filters": [
                        {
                            "propertyName": "domain",
                            "operator": "EQ",
                            "value": email_domain
                        }
                    ]
                }
            ]
        }
        r = requests.post(self.companies_search_endpoint, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json'
            }))
        results = r.json()
        return results

    def create_company(self, company_payload):

        payload = {
            "properties": company_payload
        }
        r = requests.post(self.companies_endpoint, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json'
            }))
        company = r.json()
        return company

    def delete_company(self, company_id):
        url = self.format_company_url(company_id)
        r = requests.delete(url)
        if r.status_code != 204:
            self.stdout.write(self.style.WARNING(
                'Error deleting company "%s"' % str(company_id)))
        else:
            self.stdout.write(self.style.SUCCESS(
                'Successful deletion of company "%s"' % str(company_id)))

    def associate_company_with_contact(self, company_id, contact_id):

        payload = {
            "inputs": [
                {
                    "from": {
                        "id": contact_id
                    },
                    "to": {
                        "id": company_id
                    },
                    "type": "contact_to_company"
                }
            ]
        }

        url = self.format_associations_endpoint('create')

        r = requests.post(url, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json'
            }))

        resp = r.json()
        return resp

    def check_contact_properties(self):

        r = requests.get(self.contact_properties_endpoint)

        resp = r.json()
        return resp
