import { Text, useSend } from 'alemonjs'
import { operationLock } from '@src/xiuxian/core'
import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^(#|\/)?升级宝库$/
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
    Send(Text('待更新...'))
    return
  }
])
