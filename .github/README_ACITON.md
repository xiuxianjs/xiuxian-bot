# 自动化部署

## 配置变量

github仓库中

1. 前往 Settings > Actions secrets and variables > Action

2. 点击 New repository secret

3. 配置 Name 和 Secret

## 变量说明

- SSH_PRIVATE_KEY

ssh 密钥

- SSH_SERVER_USER

ssh 用户

- SSH_SERVER_IP_QQ_BOT

向qqbot推送的地址

- SSH_CONFIG_YAML

alemon.config.yaml 配置文件内容

## 生成密钥

- 部署密钥

ssh-copy-id `user`@`ip`

- 校验ip可通

```sh
ip=0.0.0.0
user='root'
ssh -o BatchMode=yes -o StrictHostKeyChecking=no $user@$ip "echo '完成!' || echo '连接错误'"
```
