import './sql'
import Koa from 'koa'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { useRouter } from './routes'
import { getConfig } from 'alemonjs'
const config = getConfig()
// 端口
const port = config.value?.server?.port ?? 8787
// 获取当前文件的目录
const app = await useRouter(new Koa(), {
  dir: dirname(fileURLToPath(import.meta.url)),
  secert_key: config.value?.server?.secert_key ?? 'xiuxian'
})
// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
