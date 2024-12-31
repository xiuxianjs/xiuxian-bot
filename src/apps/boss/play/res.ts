import { Text, useSend } from 'alemonjs'
// 攻击
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^查看九城三十六郡$/.test(e.MessageText)) {
      next()
      return
    }
    const Send = useSend(e)
    Send(Text('待开放'))
  },
  ['message.create', 'private.message.create']
)
