import { Text, useSend } from 'alemonjs'
import { operationLock } from '@src/xiuxian/core'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)升级宝库$/
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
      Send(Text('待更新...'))
      return
    }
  ],
  ['message.create', 'private.message.create']
)
