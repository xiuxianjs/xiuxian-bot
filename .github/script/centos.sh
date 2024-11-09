#!/bin/bash

# Centos8 以上

# 服务器环境初始化脚本
sudo yum update -y

# 安装 wget curl
sudo yum install wget -y
sudo yum install curl -y

# 安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc
source ~/.bashrc # 刷新环境
nvm -v # 版本

# 安装 node
nvm install 18.20.3
nvm use 18.20.3
node -v
npm -v

# 安装 yarn 
npm install yarn@1.19.1 -y --registry=https://registry.npmmirror.com

# 安装 rsync
sudo yum install rsync -y
rsync --version

# 安装 git
yum install git

# 安装 chromium
yum  install chromium -y

# 安装 more
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y
yum install libdrm libgbm libxshmfence -y
yum install nss -y
yum update nss -y

# 安装 fonts
yum groupinstall fonts -y