#!/bin/bash

# 创建 dist
mkdir dist
# 复制 
cp -rf .npmrc ./dist
# 创建 build
mkdir build
# 删除 npmrc
rm -rf .npmrc
# 安装yarn
npm install yarn@1.12.1 -g
# 加载依赖
yarn install --ignore-engines
# 打包
yarn build
# 复制文件
cp -rf dist/.npmrc ./build
cp -rf lib ./build
cp -rf .puppeteerrc.cjs ./build
cp -rf package.json ./build
cp -rf pm2.config.cjs ./build