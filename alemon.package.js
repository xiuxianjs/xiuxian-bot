import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
class Webview {
  load() {
    return ``
  }
}
export default {
  // 项目地址
  __dirname: __dirname,
  // logo地址
  logo: new URL('./src/assets/img/right.jpg', import.meta.url).toString(),
  // webview
  Webview
}
