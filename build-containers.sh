#!/usr/bin/env bash

yarn build
docker-compose --env-file .env.docker build
