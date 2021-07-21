#!/usr/bin/env bash

# Creates a production build dashboard and deploys to the specified environment

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

# API_URI=https://fusion-online-lb-1-sandbox-1156565909.us-east-2.elb.amazonaws.com/graphql/
API_URI=https://api-sandbox.fusiononline.io/graphql/

if [ "$BUILD_ENV" == "prod" ]; then
  API_URI=https://fusion-online-lb-1-sandbox-1156565909.us-east-2.elb.amazonaws.com/graphql/
fi

echo -e "\nBuilding for ${RED}${BUILD_ENV}${NC} and deploying to ${RED}${BUILD_ENV}${NC} (using whatever code is currently checked out in your working directory)."
echo -e "\nUsing these environment variables: API_URI=${RED}${API_URI}${NC}\n"

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

pushd ../saleor-dashboard

npm install
API_URI=$API_URI npm run build

AWS_PROFILE=$AWS_PROFILE aws s3 sync build/dashboard/ s3://fusion-online-admin-dashboard-sandbox --acl public-read --delete
AWS_PROFILE=$AWS_PROFILE aws s3 cp src/robots.txt s3://fusion-online-admin-dashboard-sandbox --acl public-read
popd

echo -e "\nAll done deploying to ${RED}${BUILD_ENV}${NC}."
