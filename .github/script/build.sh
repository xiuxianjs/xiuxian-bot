#!/bin/bash

# 确保弹出错误
set -e

# Create distribution directory and copy necessary files
mkdir -p dist
mv .npmrc dist/

# Install yarn and dependencies, then build the project
npm install -g yarn@1.19.1
yarn install --ignore-engines
yarn build

# Copy project files to the distribution directory
cp -rf packages/xiuxian/{index.js,lib,.puppeteerrc.cjs,package.json,pm2.config.cjs} dist/
