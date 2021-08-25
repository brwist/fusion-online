#!/usr/bin/env bash

# Exit script if you try to use an uninitialized variable.
set -o nounset

# Exit script if a statement returns a non-true return value.
set -o errexit

# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail

echo "Deploying storefront sandbox..."
cd ./storefront
npm install
npm run build
aws s3 sync build/ s3://fusion-online-storefront-sandbox --acl public-read --delete
echo "Storefront sandbox deployed!"