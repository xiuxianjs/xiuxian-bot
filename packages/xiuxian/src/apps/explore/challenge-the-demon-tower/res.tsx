import { Text, useSend } from 'alemonjs'
import * as GameApi from '@xiuxian/core/index'
import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)挑战妖塔$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const T = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    return
  }
])
