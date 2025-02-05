# 自动化部署

## 本地生产

- 部署密钥

```sh
ssh-copy-id SSH_SERVER_USER@SSH_SERVER_IP
```

- 校验ip可通

```sh
SSH_SERVER_IP=0.0.0.0
SSH_SERVER_USER='user'
ssh -o BatchMode=yes -o StrictHostKeyChecking=no $SSH_SERVER_USER@$SSH_SERVER_IP "echo 'successful!' || echo 'Connection failed'"
```

## 含义

- SSH_PRIVATE_KEY

ssh 密钥

- SSH_SERVER_USER

ssh 用户

- SSH_SERVER_IP_QQ_BOT

向qqbot推送的地址

- SSH_CONFIG_YAML

alemon.config.yaml 配置文件
