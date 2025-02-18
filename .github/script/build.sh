#!/bin/bash

set -e

echo "Creating distribution directory..."
mkdir -p dist
# 复制.npmrc文件
mv .npmrc dist/

echo "Installing dependencies and building the project..."
npm install -g yarn@1.19.1
yarn install --ignore-engines
yarn build

echo "Copying project files to the distribution directory..."

ls -al ./packages/xiuxian
cp -rf ./packages/xiuxian/index.js dist/
cp -rf ./packages/xiuxian/lib dist/
cp -rf ./packages/xiuxian/.puppeteerrc.cjs dist/
cp -rf ./packages/xiuxian/package.json dist/
cp -rf ./packages/xiuxian/pm2.config.cjs dist/

# 恢复.npmrc文件
cp dist/.npmrc ./.npmrc
