#!/usr/bin/env bash
# Deploy the images on the target server

repo_root=$( cd "$(dirname "${BASH_SOURCE[0]}")/.." ; pwd -P )
cd "$repo_root"

connection=$1
target_directory=$2

scp docker-compose.yml "$connection":"$target_directory"
scp dist/containers/stockeer.tar.gz "$connection":"$target_directory"
ssh "$connection" "cd $target_directory && docker load < stockeer.tar.gz && docker-compose up -d --force-recreate"

