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

2. Apply Django migrations:
```
$ docker-compose run --rm api python3 manage.py migrate
```

3. Collect static files:
```
$ docker-compose run --rm api python3 manage.py collectstatic --noinput
```

4. Populate the database with example data and create the admin user:
```
$ docker-compose run --rm api python3 manage.py populatedb --createsuperuser
```

5. Start everything (services, dashboard and storefront)
```
docker-compose up
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

* Services (Django) URL: http://localhost:8000
* Dashboard URL: http://localhost:9000
* Storefront URL: http://localhost:9001

Mailhog URL: http//localhost:8025
* Use Mailhog to view emails sent by the platform.