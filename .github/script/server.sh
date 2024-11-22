#!/bin/bash

{
  echo "#pm2 "
  echo "pm2:"
  echo "  name: 'server'"
  echo "  script: 'node lib/server.js'"
} >> alemon.config.yaml

mkdir -p build
cp alemon.config.yaml build/alemon.config.yaml