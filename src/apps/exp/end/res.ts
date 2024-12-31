import { operationLock } from '@src/xiuxian/core'

import { Attributes, user } from '@src/xiuxian/db'
import { endAllWord } from '@xiuxian/api/index'
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
    if (!/^(#|\/)(归来|歸來|凝脉|出关|出關|聚灵|聚靈)$/.test(e.MessageText)) {
      next()
      return
    }
    // 操作锁
    const TT = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey
    const UserData = e['UserData'] as Attributes<typeof user>
    endAllWord(e, UID, UserData)
    return
  },
  ['message.create', 'private.message.create']
)
