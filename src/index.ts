import { defineChildren } from 'alemonjs'
export default defineChildren(() => {
  return {
    async onCreated() {
      // 整个模块被识别时
      console.info('修仙机器人启动')
      await import('./sql')
      if (process.argv.includes('--xx-server')) {
        await import('./server')
      }
    }
  }
})
