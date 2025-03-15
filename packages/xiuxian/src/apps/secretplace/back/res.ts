import { Text, useSend } from 'alemonjs'

import * as GameApi from '@xiuxian/core/index'
import { createSelects } from 'alemonjs'
import Xiuxian, { useCurrent } from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)返回$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const TT = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey
    const UserData = useCurrent(e).UserData

    // 不是赶路状态
    if (UserData.state == 3) {
      // 取消行为
      const id = await GameApi.Place.get(UID)
      if (id) clearTimeout(id)
      // 清除行为
      GameApi.move.cancelJob(UID)
      Send(Text('已取消赶路'))
      return
    }
    if (UserData.state == 4) {
      await GameApi.State.del(UID)
      // 取消行为
      const id = await GameApi.Place.get(UID)
      if (id) {
        clearTimeout(id)
      }
      Send(Text('已取消传送'))
      return
    }
    return
  }
])
