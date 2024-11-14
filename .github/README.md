# 修仙机器人

使用AlemonJS+VlyJS进行开发的修仙机器人。

环境相关 https://lvyjs.dev/ 根据对应系统部署环境

### 本地调试

- 源码安装

```sh
git clone --depth=1  https://github.com/xiuxianjs/xiuxian-bot.git
cd xiuxian-bot
```

- 依赖加载

```sh
npm install yarn@1.12.1 -g
yarn --ignore-engines
```

- 配置环境

配置`alemon.config.yaml`文件

```yaml
# 新增redis配置
redis:
  host: 'localhost'
  port: '6379'
  password: ''
  db: '1'
# 新增db配置
db:
  host: 'localhost'
  port: '3306'
  user: 'root'
  password: 'My002580!'
  database: 'xiuxian_test'
# 新增客户端配置
gui:
  port: 9601
```

## MySQL&Redis

> 必须安装mysql8才能运行

以下是docker如何安装数据库等步骤

- 启动

```sh
docker-compose up -d
```

- 停止

```sh
docker-compose pause
```

## 测试客户端

请在 https://alemonjs.com/ 中下载客户端

- 登录gui

```sh
yarn dev --login gui
```

> 首次运行请等待1-2分钟。确保数据完全植入

- 连接

客户端 > 消息 > 连接

> 会提示 ws://localhost:9601 已连接

- 测试

发送指令`/修仙帮助`

## 登录平台

> 推荐先使用测试客户端进行测试再登录

登录相关 https://alemonjs.com/ 阅读对应平台包`README.md`

## Github自动化部署

[README_ACITON](./README_ACITON.md)

## 交流

QQ Group 806943302
