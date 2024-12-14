import { defineConfig } from 'lvyjs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))

const includes = (val: string) => process.argv.includes(val)

const alemonjs = async () => (await import('alemonjs')).onStart()
const jsxp = async () => (await import('jsxp')).createServer()

export default defineConfig({
  plugins: [
    () => {
      if (includes('--alemonjs')) return alemonjs
      if (includes('--jsxp')) return jsxp
    }
  ],
  alias: {
    entries: [{ find: '@src', replacement: join(__dirname, 'src') }]
  },
  assets: {
    filter: /\.(png|jpg|jpeg|gif|svg|webp|ico|sql)$/
  },
  build: {
    typescript: {
      removeComments: true
    }
  }
})
