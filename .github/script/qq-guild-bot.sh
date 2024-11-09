#!/bin/bash

{
  echo "#pm2 "
  echo "pm2:"
  echo "  name: 'qq-guild-bot'"
  echo "  script: 'alemonjs start --input lib/index.js --login qq-guild-bot'"
} >> alemon.config.yaml

mkdir -p build 
cp alemon.config.yaml build/alemon.config.yaml