#!/bin/bash

# 确保弹出错误
set -e

echo "Creating distribution directory..."
mkdir -p dist
mv .npmrc dist/

echo "Installing dependencies and building the project..."
npm install -g yarn@1.19.1
yarn install --ignore-engines
yarn build

echo "Copying project files to the distribution directory..."

ls -al ./packages/xiuxian
cp -rf ./packages/xiuxian/{index.js,lib,.puppeteerrc.cjs,package.json,pm2.config.cjs} dist/
