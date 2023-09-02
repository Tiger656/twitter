# Run yarn to generate latest lockfile
# Run yarn build

#./deploy-docker.sh client | server
#sudo chmod -R 777 .db

export APP=${1}
export DOCKER_NAME=ghcr.io/tim-shvaiba/liga-twitter-server:0.0.1
export TAG=latest
export DOPPLER_TOKEN=
#build
docker build --platform linux/amd64 -t $DOCKER_NAME -f ./apps/${APP}/Dockerfile .

docker push $DOCKER_NAME:$TAG

#docker images
# docker push ghcr.io/tiger656/liga-twitter-server:0.0.1
#export CR_PAT=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
#echo $CR_PAT | docker login ghcr.io -u tim-shvaiba --password-stdin


#curl -L https://fly.io/install.sh | sh

#fly.io

#fly auth login
#fly launch --image ghcr.io/tiger656/liga-twitter/server:latest --vm-memory 512
#fly status    statu of your apps
#fly apps restart liga-twitter-server       restart your "liga-twitter-server" app
#fly platform vm-sizes      shows all available vm plans of fly.io. Its better to recheck on site
#fly scale show       VM Resources for app: liga-twitter-server
#fly scale memory 512
#flyctl machine destroy <id> [flags]    https://fly.io/docs/flyctl/machine-destroy/
#flyctl auth token  create token
#
#https://fly.io/docs/about/pricing/