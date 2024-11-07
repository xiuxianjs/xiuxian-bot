# 修仙机器人

## 环境

NodeJS > 18, Redis > 5, MySQL 8

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

```env
redis:
  host: ''
  port: ''
  password: ''
  db: ''

db:
  host: ''
  port: ''
  user: ''
  password: ''
  database: ''

db2:
  host: ''
  port: ''
  user: ''
  password: ''
  database: ''

```

- MySQL80

> 阅读 xiuxian/db/src/models 建表

数据库名 `xiuxian_bak`
字符集 `utf8mb4`
排序规则 `utf8mb4_german2_ci`

- 应用调试

```sh
yarn dev
```

- 打包

```sh
yarn build
```

- 图片调试

```sh
yarn server
```

## 目录结构

```ts
src/                // 源代码目录
    |--apps/        // 开发应用
    |--assets/
    |--xiuxian/
        |--api/
        |--core/
        |--db/
        |--img/
        |--statistics/
        |--utils/
index.ts            // 文件入口
package.json   // 工程配置文件
```
