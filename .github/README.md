# 自动化部署

## 本地生产

- 部署密钥

```sh
ssh-copy-id user@remote_server_ip
```

- 校验ip可通

```sh
IP=0.0.0.1
SSH_SERVER_USER='user'
ssh -o BatchMode=yes -o StrictHostKeyChecking=no $SSH_SERVER_USER@$IP "echo 'successful!' || echo 'Connection failed'"
```

- 确保服务器已安装

```sh
sudo yum update
sudo yum install rsync -y
rsync --version
```

## 含义

- SSH_PRIVATE_KEY

ssh 密钥

- SSH_SERVER_USER

ssh 用户

- SSH_SERVER_IP_CONFIG

获取配置的地址

- SSH_SERVER_IP_DISCORD

向discord推送的地址

- SSH_SERVER_IP_QQ_BOT

向qqbot推送的地址

- SSH_SERVER_IP_QQ

向qq推送的地址
