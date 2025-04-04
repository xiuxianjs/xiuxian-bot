import { Text, useSend } from 'alemonjs'
import * as GameApi from '@xiuxian/core/index'

import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^(#|\/)?挑战妖塔$/
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
