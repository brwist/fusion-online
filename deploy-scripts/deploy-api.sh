#!/usr/bin/env bash

# Builds the docker image for the Django backend, pushes the image to the
# ECR registry, and updates the given environment's service to use the new image.

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

pushd ../saleor

DOCKER_REGISTRY="647697256804.dkr.ecr.us-east-2.amazonaws.com/fusion-online-core-services-$BUILD_ENV"
BUILD_DATE=`date +%Y%m%d%H%M%S`
COMMIT_HASH=`git rev-parse HEAD`

# Tag format is env-commithash-date
BUILD_TAG="$BUILD_ENV-$COMMIT_HASH-$BUILD_DATE"

docker build -t "$DOCKER_REGISTRY:$BUILD_TAG" -t "$DOCKER_REGISTRY:latest" .

AWS_PROFILE=$AWS_PROFILE aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 647697256804.dkr.ecr.us-east-2.amazonaws.com

docker push "$DOCKER_REGISTRY:$BUILD_TAG"
docker push "$DOCKER_REGISTRY:latest"

echo -e "\nPushed ${RED}${BUILD_ENV}${NC} image to the ECR registry. Now deploying ${RED}${BUILD_ENV}${NC} service with the latest image.\n"

AWS_PROFILE=$AWS_PROFILE aws ecs update-service --region us-east-2 --cluster fusion-online-ecs-cluster-$BUILD_ENV --service core-services --task-definition core-services --force-new-deployment

popd

echo -e "\nAll done deploying to ${RED}${BUILD_ENV}${NC}. ${RED}${BUILD_ENV}${NC} service is now using the latest image."
