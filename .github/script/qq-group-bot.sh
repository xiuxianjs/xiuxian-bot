#!/bin/bash

{
  echo "#pm2 "
  echo "pm2:"
  echo "  name: 'qq-group-bot'"
  echo "  script: 'alemonjs start --input lib/index.js --login qq-group-bot'"
} >> alemon.config.yaml

mkdir -p build 
cp alemon.config.yaml build/alemon.config.yaml