import { defineChildren } from 'alemonjs'
export default defineChildren(() => {
  return {
    async onCreated() {
      console.info('修仙机器人启动')
      await import('./sql')
    }
  }
})
