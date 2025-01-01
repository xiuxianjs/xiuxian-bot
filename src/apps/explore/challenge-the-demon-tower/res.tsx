import { Text, useSend } from 'alemonjs'
import * as GameApi from '@xiuxian/core/index'
import Xiuxian from '@src/apps/index'
export const regular = /^(#|\/)挑战妖塔$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
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
    }
  ],
  ['message.create', 'private.message.create']
)
