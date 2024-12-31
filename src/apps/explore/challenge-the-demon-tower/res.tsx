import { Text, useSend } from 'alemonjs'
import * as GameApi from '@xiuxian/core/index'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)挑战妖塔$/.test(e.MessageText)) {
      next()
      return
    }
    const T = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    return
  },
  ['message.create', 'private.message.create']
)
