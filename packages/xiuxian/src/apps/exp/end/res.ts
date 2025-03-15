import { operationLock } from '@src/xiuxian/core'

import { endAllWord } from '@xiuxian/api/index'
import { Text, useSend } from 'alemonjs'
import { createSelects } from 'alemonjs'
import Xiuxian, { useCurrent } from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)(归来|歸來|凝脉|出关|出關|聚灵|聚靈)$/
export default onResponse(selects, [
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
    const UserData = useCurrent(e).UserData
    endAllWord(e, UID, UserData)
    return
  }
])
