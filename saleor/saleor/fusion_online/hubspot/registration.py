import json
import requests
import pprint

from django.conf import settings

from hubspot import HubSpot
from hubspot.crm.contacts import ApiException


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

    def register_new_hubspot_user(self, user):
        r = self.search_userbase(user.email)
        if len(r['results']) > 0:
            pprint(
                '"%s" hubspot emails found' % str(r['total']))
        else:
            pprint(
                'No existing hubspot emails found for email "%s", creating new account in hubspot.' % user.email)

            existing_companies = self.check_company(user.email)
            email_domain = self.get_email_domain(user.email)
            if len(existing_companies['results']) > 0:
                # pick the first
                company = existing_companies['results'][0]
                pprint(
                    'Company found: "%s".' % company['properties']['name'])

                # Create user with property role_rc = ADMIN
                hubspot_user = self.add_user(user, 'User')
                pprint(
                    'Hubspot user created with user id "%s" with role "%s".' % (str(hubspot_user['id']), str(hubspot_user['properties']['role_rc'])))

                # Create the association
                self.associate_company_with_contact(company['id'], hubspot_user['id'])

            else:
                pprint(
                    'No company found for email "%s". Creating a new company in Hubspot for domain "%s".' % (user.email, email_domain))

                company_payload = {
                    "name": user['company'],
                    "domain": self.get_email_domain(user.email)
                }

                company = self.create_company(company_payload)

                # Create user with property role_rc = ADMIN
                hubspot_user = self.add_user(user, 'Admin')
                pprint(
                    'Hubspot user created with user id "%s" with role "%s".' % (str(hubspot_user['id']), str(hubspot_user['properties']['role_rc'])))

                # Create the association
                self.associate_company_with_contact(company['id'], hubspot_user['id'])

        return hubspot_user

    def search_userbase(self, email):
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
        payload = {
            "properties": {**user, 'role_rc': role}
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
