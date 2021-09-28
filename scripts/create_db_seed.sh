#!/usr/bin/env bash

SCRIPT_DIR=`dirname "$0"`

# Use the SALEOR_DB_SOURCE_HOST_URL env var for our db URL if it's set, otherwise
# default to the usual URL.
: "${SALEOR_DB_SOURCE_HOST_URL:=postgresql://saleor:saleor@localhost:5432}"

OUTPUT_PATH=$SCRIPT_DIR/../data/saleor-db.sql
pg_dump --dbname=$SALEOR_DB_SOURCE_HOST_URL/saleor > $OUTPUT_PATH

echo "Created seed SQL file at $OUTPUT_PATH."
