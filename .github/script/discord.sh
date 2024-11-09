#!/bin/bash

{
  echo "#pm2 "
  echo "pm2:"
  echo "  name: 'discord'"
  echo "  script: 'alemonjs start --input lib/index.js --login discord'"
} >> alemon.config.yaml

mkdir -p build
cp alemon.config.yaml build/alemon.config.yaml