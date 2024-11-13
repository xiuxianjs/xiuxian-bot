import { defineChildren } from 'alemonjs'
/**
 * 如何才能修改每个版本的sql差异？
 */
export default defineChildren(() => {
  return {
    async onCreated() {
      // 整个模块被识别时
      console.info('修仙机器人启动')
      await import('./sql')
    }
  }
})
