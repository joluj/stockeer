#!/usr/bin/env bash
# Runs the full deployment process

repo_root=$( cd "$(dirname "${BASH_SOURCE[0]}")/.." ; pwd -P )
cd "$repo_root"

connection=$1
target_directory=$2

./devops/build-containers.sh
./devops/build-tarball.sh
./devops/deploy.sh "$connection" "$target_directory"
