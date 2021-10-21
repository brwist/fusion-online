import json
import requests

import pprint

from django.conf import settings

from hubspot import HubSpot
from hubspot.crm.contacts import ApiException

from django.forms.models import model_to_dict
from .serializers import HubspotContactSerializer


class HubspotRegistration:

    def __init__(self):
        self.api_key = settings.HUBSPOT_API_KEY
        self.client = HubSpot(api_key=self.api_key)
        self.test_email = "alxvallejo@36creative.com"
        self.test_email2 = "alxvallejo+2@36creative.com"

        self.test_user = {
            "firstname": "Alex",
            "lastname": "Vallejo",
            "email": self.test_email,
            "company": "36 Creative",
            "customer_approval_status_rc": "Limited"  # property in Hubspot for all new registrations
        }

        self.test_user2 = {
            "firstname": "Alex2",
            "lastname": "Vallejo2",
            "email": self.test_email2,
            "company": "36 Creative",
            "customer_approval_status_rc": "Limited"
        }

        self.contacts_endpoint = 'https://api.hubapi.com/crm/v3/objects/contacts?hapikey=' + self.api_key
        self.contacts_search_endpoint = 'https://api.hubapi.com/crm/v3/objects/contacts/search?hapikey=' + self.api_key
        self.companies_search_endpoint = 'https://api.hubapi.com/crm/v3/objects/companies/search?hapikey=' + self.api_key
        self.companies_endpoint = 'https://api.hubapi.com/crm/v3/objects/companies?hapikey=' + self.api_key
        self.contact_properties_endpoint = 'https://api.hubapi.com/crm/v3/properties/contacts/role_rc?hapikey=' + self.api_key

    def format_associations_endpoint(self, type):
        return 'https://api.hubapi.com/crm/v3/associations/contact/company/batch/' + type + '?hapikey=' + self.api_key

    def format_contact_endpoint(self, contact_id):
        return 'https://api.hubapi.com/crm/v3/objects/contacts/' + contact_id + '?hapikey=' + self.api_key

    def get_email_domain(self, email):
        parts = email.split('@')
        return parts[1]

    def register_new_hubspot_user(self, user):
        r = self.search_hubspot_userbase(user.email)
        if len(r['results']) > 0:
            print(
                '"%s" hubspot emails found' % str(r['total']))
            hubspot_user = r['results'][0]
        else:
            print(
                'No existing hubspot emails found for email "%s", creating new account in hubspot.' % user.email)

            # existing_companies = self.check_company(user.email)
            # email_domain = self.get_email_domain(user.email)
            # if len(existing_companies['results']) > 0:
            #     # pick the first
            #     company = existing_companies['results'][0]
            #     print(
            #         'Company found: "%s".' % company['properties']['name'])

            # Create user with property role_rc = ADMIN
            hubspot_user = self.add_user(user, 'User')
            print(
                'Hubspot user created with user id "%s" with role "%s".' % (str(hubspot_user['id']), str(hubspot_user['properties']['role_rc'])))

                # # Create the association
                # self.associate_company_with_contact(company['id'], hubspot_user['id'])

            # else:
            #     print(
            #         'No company found for email "%s". Creating a new company in Hubspot for domain "%s".' % (user.email, email_domain))

                # company_payload = {
                #     "name": user.private_metadata['company'],
                #     "domain": self.get_email_domain(user.email),
                #     "region_rms": user.private_metadata['region']
                # }

                # company = self.create_company(company_payload)

                # Create user with property role_rc = ADMIN
                # hubspot_user = self.add_user(user, 'Admin')
                # if hubspot_user:
                #     print(
                #         'Hubspot user created with user id "%s" with role "%s".' % (str(hubspot_user['id']), str(hubspot_user['properties']['role_rc'])))

                #     # Create the association
                #     self.associate_company_with_contact(
                #         company['id'], hubspot_user['id'])

        return hubspot_user

    def search_hubspot_userbase(self, email):
        payload = {
            "filterGroups": [
                {
                    "filters": [
                        {
                            "propertyName": "email",
                            "operator": "EQ",
                            "value": email
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

    def add_user(self, user, role):
        data = {
            "company": user.private_metadata['company'],
            "email": user.email,
            "firstname": user.first_name,
            "lastname": user.last_name,
            "customer_approval_status_rc": "Limited",
            "role_rc": role,
            "hubspot_owner_id": settings.HUBSPOT_API_CONTACT_OWNER_ID,
            "phone": "603-555-5555",
            "jobtitle": "Software Developer",
            "hs_language": "en-us"
        }
        payload = {
            "properties": data
        }
        r = requests.post(self.contacts_endpoint, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json'
            }))
        if r.status_code != 201:
            return None
        else:
            hubspot_user = r.json()
            return hubspot_user

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
            "properties": {
                **company_payload,
                "hubspot_owner_id": settings.HUBSPOT_API_CONTACT_OWNER_ID,
                "numberofemployees": "25",
                "country_rms": "USA",
                "state": "NH",
                "city": "Portsmouth",
                "address": "123 Test Rd.",
                "type": "Computing",
            }
        }
        r = requests.post(self.companies_endpoint, data=json.dumps(payload), headers=(
            {
                'Content-Type': 'application/json'
            }))
        company = r.json()
        return company

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

    def validate_email(self, email):
        r = self.search_hubspot_userbase(email)
        if len(r['results']) > 0:
            print(
                '"%s" hubspot emails found' % str(r['total']))
            hubspot_user = r['results'][0]
            payload = {
                "properties": {
                    "email_verified__rc_": "true"
                }
            }
            url = self.format_contact_endpoint(hubspot_user['id'])
            r = requests.patch(url, data=json.dumps(payload), headers=(
                {
                    'Content-Type': 'application/json'
                }))
            if r.status_code != 200:
                return None
            else:
                hubspot_user = r.json()
                return hubspot_user
        else:
            return None

    def get_hubspot_user_by_email(self, email):
        r = self.search_hubspot_userbase(email)
        if len(r['results']) > 0:
            hubspot_user = r['results'][0]
            return hubspot_user
        else:
            return None

    def get_hubspot_user_by_id(self, contact_id):
        url = self.format_contact_endpoint(
            contact_id) + '&properties=customer_approval_status_rc,role_rc'
        r = requests.get(url, headers=(
            {
                'Content-Type': 'application/json'
            }))
        if r.status_code != 200:
            return None
        else:
            hubspot_user = r.json()
            return hubspot_user
