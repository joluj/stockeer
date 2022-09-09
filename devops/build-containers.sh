#!/usr/bin/env bash
# Builds the docker-images

repo_root=$( cd "$(dirname "${BASH_SOURCE[0]}")/.." ; pwd -P )
cd "$repo_root"

yarn build
docker-compose --env-file .env.docker build
