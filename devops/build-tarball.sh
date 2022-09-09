#!/usr/bin/env bash
# Build a tarball from the existing docker images

repo_root=$( cd "$(dirname "${BASH_SOURCE[0]}")/.." ; pwd -P )
cd "$repo_root"

mkdir -p "dist/containers"
docker save stockeer-frontend stockeer-backend | gzip > dist/containers/stockeer.tar.gz

