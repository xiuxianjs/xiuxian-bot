import '@src/sql'
import Koa from 'koa'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { useRouter } from '@src/server/routes'
import { startServer } from '@src/server/port'
import bodyParser from 'koa-bodyparser'
import { getConfig } from 'alemonjs'
async function main() {
  const config = getConfig()
  const value = config.value
  const port = value?.server?.port ?? 8787
  const app = new Koa()
  // 中间件：解析请求体
  app.use(bodyParser())
  const server = await useRouter(app, {
    dir: join(dirname(fileURLToPath(import.meta.url)), 'server'),
    secert_key: value?.server?.secert_key ?? 'xiuxian'
  })
  startServer(port, () => {
    server.listen(port, () => {
      logger.info(`Server is running on http://localhost:${port}`)
    })
  })
}

main()
