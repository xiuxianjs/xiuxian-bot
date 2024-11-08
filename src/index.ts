import { defineChildren } from 'alemonjs'
export default defineChildren(() => {
  return {
    onCreated() {
      // 整个模块被识别时
      logger.info('修仙机器人启动')
    }
  }
})
