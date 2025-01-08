#!/bin/bash

# Create directories
mkdir -p dist build

# Copy necessary files to dist
cp -rf .npmrc index.js dist/

# Remove .npmrc from the current directory
rm -rf .npmrc

# Install yarn globally
npm install -g yarn@1.19.1

# Load dependencies using yarn
yarn install --ignore-engines

# Build the project
yarn build

# Copy files to build
cp -rf dist/.npmrc dist/index.js lib .puppeteerrc.cjs package.json pm2.config.cjs build/

# List contents of the build directory
ls build
