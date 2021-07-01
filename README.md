# Fusion Online Platform

Fusion Online Services, Admin Dashboard and Storefront

This project is a shallowly cloned fork of the Saleor Platform 2.11.0 project. It provides:

* The Django-based services
* The admin dashboard
* The storefront

## How to run the project the first time

1. Build the docker images.
```
$ docker-compose build
```

2. Start everything (services)
```
$ docker-compose up
```

3. Apply Django migrations:
```
$ docker-compose run --rm api python3 manage.py migrate
```

4. Collect static files:
```
$ docker-compose run --rm api python3 manage.py collectstatic --noinput
```

5. Populate the database with example data and create the admin user:
```
$ docker-compose run --rm api python3 manage.py populatedb --createsuperuser
```

## Starting and stopping everything:

Stop everything:
```
docker-compose stop
```

Start everything:
```
docker-compose up
```

## Local environment URLS:

Services (Django) URL: http://localhost:8000

Dashboard URL: http://localhost:9000
* Login with admin@example.com / admin

Storefront URL: http://localhost:9001

Mailhog URL: http//localhost:8025
* Use Mailhog to view emails sent by the platform.

## Storefront Development

1. From the storefront directory, install dependencies:
```
cd storefront && npm install
```
2. Start Storybook:
- This project uses Storybook as a tool for UI development. 
- Components can be built in isolation, rendered on the storybook interface and tested. 
- See Storybook docs for more info: https://storybook.js.org/docs/react/get-started/introduction
```
npm run storybook
```

## Things that should actually be scripts

### Creating an API Key for the Fusion Online API

From the project root start a django shell session:

```
$ docker-compose run --rm api bash
$ python3 manage.py shell
```

In the django shell run the following statements:

```
>>> from rest_framework_api_key.models import APIKey
>>> api_key, key = APIKey.objects.create_key(name="rms-service")
>>> key
```

That last statement will print out the key that was generated.