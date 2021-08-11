# Fusion Online Platform

Fusion Online Services, Admin Dashboard and Storefront

This project is a shallowly cloned fork of the Saleor Platform 2.11.0 project. It provides:

* The Django-based services
* The admin dashboard
* The storefront

## How to run the project the first time

### Prerequisites:

* docker
* psql

1. Build the docker images.
```
$ docker-compose build
```

2. Start the database 
```
$ docker-compose up db
```

3. Populate the database
```
$ scripts/seed_db.sh
```

4. Start everything
```
$ docker-compose stop rm -fv
$ docker-compose up
```

## Local environment URLS:

Services (Django) URL: http://localhost:8000

Dashboard URL: http://localhost:9000
* Login with admin@example.com / admin

Storefront URL: http://localhost:9001

Mailhog URL: http//localhost:8025
* Use Mailhog to view emails sent by the platform.

## Starting and stopping everything:

Stop everything:
```
docker-compose stop rm -fv
```

Start everything:
```
docker-compose up
```

## Storefront Development

We are using node 14.16.1. If you use `asdf` to manage your node
version you should be good to go, but otherwise any recent version
of node should work fine.

1. From the storefront directory, install dependencies:

```
cd storefront && npm install
```

2. Build and serve the storefront React app:

```
npm start
```

3. (Optional) Start Storybook:
- This project uses Storybook as a tool for UI development. 
- Components can be built in isolation, rendered on the storybook interface and tested. 
- See Storybook docs for more info: https://storybook.js.org/docs/react/get-started/introduction

```
npm run storybook
```

## Creating the database seeding SQL script

To create the database seeding SQL script you can run:

```
$ scripts/create_db_seed.sh
```

This script will take a snapshot of your local saleor database using
the `pg_dump` command, and place the result SQL file at `data/saleor-db.sql`.

You can override the database URL if you need to:

```
SALEOR_DB_SOURCE_HOST_URL=postgresql://saleor:saleor@example.com:5888 scripts/create_db_seed.sh
```

## Populating the database using the seed SQL script

To populate your local database using the seed SQL script (at `data/saleor-db.sql`) run:

```
$ scripts/seed_db.sh
```
This script will drop any existing connections to the `saleor` database,
drop the `saleor` database and then re-create the `saleor` database using
the seed SQL script.

You can override the database URL if you need to:

```
SALEOR_DB_TARGET_HOST_URL=postgresql://saleor:saleor@example.com:5888 scripts/seed_db.sh
```

## Other Useful Commands

Apply Django migrations:

```
$ docker-compose run --rm api python3 manage.py migrate
```

Collect static files:

```
$ docker-compose run --rm api python3 manage.py collectstatic --noinput
```

Create the Django admin user:

```
$ docker-compose run --rm api python3 manage.py populatedb --createsuperuser
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
