import { operationLock } from '@src/xiuxian/core'

import { Attributes, user } from '@src/xiuxian/db'
import { endAllWord } from '@xiuxian/api/index'
import { Text, useSend } from 'alemonjs'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)(归来|歸來|凝脉|出关|出關|聚灵|聚靈)$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
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
    }
  ],
  ['message.create', 'private.message.create']
)
