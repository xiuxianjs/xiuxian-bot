import { defineConfig } from 'lvyjs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
const includes = (val: string) => process.argv.includes(val)
const alemonjs = () =>
  import('alemonjs').then(res => res.onStart('src/index.ts'))
const jsxp = () => import('jsxp').then(res => res.createServer())
export default defineConfig({
  plugins: [
    () => {
      if (includes('--alemonjs')) return alemonjs
      if (includes('--jsxp')) return jsxp
    }
  ],
  assets: {
    filter: /\.(png|jpg|jpeg|gif|svg|webp|ico)$/
  },
  styles: {
    filter: /\.(less|sass|scss|css)$/
  },
  alias: {
    entries: [
      { find: '@src', replacement: join(__dirname, 'src') },
      { find: '@xiuxian', replacement: join(__dirname, 'src', 'xiuxian') }
    ]
  },
  build: {
    typescript: {
      removeComments: true
    }
  }
})
