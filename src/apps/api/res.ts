import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)小白[\u4e00-\u9fa5]+$/.test(e.MessageText)) {
      next()
      return
    }
    return
  },
  ['message.create', 'private.message.create']
)
