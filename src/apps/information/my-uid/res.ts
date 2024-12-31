import { Text, useSend } from 'alemonjs'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)我的编号$/.test(e.MessageText)) {
      next()
      return
    }
    const Send = useSend(e)
    Send(Text(e.UserId))
  },
  ['message.create', 'private.message.create']
)
