# 修仙机器人

使用AlemonJS+VlyJS进行开发的修仙机器人。

https://alemonjs.com/

https://lvyjs.dev/

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
  host: ''
  port: ''
  password: ''
  db: ''
# 新增db配置
db:
  host: ''
  port: ''
  user: ''
  password: ''
  database: ''
# 新增客户端配置
gui:
  port: 9601
```

- MySQL80

> 必须安装mysql8才能才能运行

数据库名 `xiuxian`
字符集 `utf8mb4`
排序规则 `utf8mb4_german2_ci`

> 执行src/sql文件进行建表

## 测试客户端

请在 https://alemonjs.com/ 中下载客户端

- 登录gui

```sh
yarn dev --login gui
```

- 连接

客户端 > 消息 > 连接

> 会提示 ws://localhost:9601 已连接

- 测试

发送指令`/修仙帮助`

## Github自动化部署

[README_ACITON](./README_ACITON.md)

## 交流

QQ Group 806943302
