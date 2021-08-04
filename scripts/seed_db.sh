#!/usr/bin/env bash

SCRIPT_DIR=`dirname "$0"`

# Use the SALEOR_DB_TARGET_HOST_URL env var for our db URL if it's set, otherwise
# default to the usual URL.
: "${SALEOR_DB_TARGET_HOST_URL:=postgresql://saleor:saleor@localhost:5432}"

echo "Dropping existing saleor database."

psql $SALEOR_DB_TARGET_HOST_URL/postgres -f $SCRIPT_DIR/drop-and-create.sql

echo "Seeding database using $SCRIPT_DIR/../data/saleor-db.sql"

psql $SALEOR_DB_TARGET_HOST_URL/saleor -f $SCRIPT_DIR/../data/saleor-db.sql

echo "Done."
