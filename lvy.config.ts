import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { defineConfig } from 'lvyjs'
import { onStart } from 'alemonjs'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const filter = /\.(png|jpg|jpeg|gif|svg|webp|ico|sql)$/
export default defineConfig({
  plugins: [
    {
      name: 'alemon',
      useApp: () => {
        if (process.argv.includes('--alemonjs')) {
          onStart('src/index.ts')
        }
      }
    },
    {
      name: 'jsxp',
      useApp: async () => {
        if (process.argv.includes('--view')) {
          const { createServer } = await import('jsxp')
          createServer()
        }
      }
    }
  ],
  esbuild: {
    assets: {
      filter: filter
    }
  },
  build: {
    alias: {
      entries: [{ find: '@src', replacement: join(__dirname, 'src') }]
    },
    typescript: {
      // 去除注释
      removeComments: true
    },
    assets: {
      filter: filter
    }
  }
})
