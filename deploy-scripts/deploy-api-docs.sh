#!/usr/bin/env bash

# Deploys the API documention to the CloudFront/S3 host.

# Bail out upon error
set -e

RED='\033[1;31m'
NC='\033[0m'

AWS_PROFILE=fusion

# Default to dev if the BUILD_ENV env var isn't set
: "${BUILD_ENV:=sandbox}"

if [ "$BUILD_ENV" != "sandbox" ] && [ "$BUILD_ENV" != "prod" ]; then
  echo "Invalid BUILD_ENV ($BUILD_ENV). Valid values are 'sandbox' and 'prod'."
  exit
fi

echo -e "\nBuilding for ${RED}${BUILD_ENV}${NC} and deploying to ${RED}${BUILD_ENV}${NC} (using whatever code is currently checked out in your working directory)."

read -p "Proceed? [y/N]: " answer
case ${answer:0:1} in
    y|Y )
	echo -e "\nHold on to your butts.\n"
    ;;
    * )
        echo -e "\nCancelled."
        exit
    ;;
esac

pushd ../api-docs

AWS_PROFILE=$AWS_PROFILE aws s3 sync public/ s3://fusion-online-api-docs-sandbox --delete
popd

echo -e "\nAll done deploying to ${RED}${BUILD_ENV}${NC}."
