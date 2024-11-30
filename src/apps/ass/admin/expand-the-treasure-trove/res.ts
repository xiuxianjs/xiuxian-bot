import { Text, useSend } from 'alemonjs'
import { operationLock } from '@src/xiuxian/core'
export default OnResponse(
  async e => {
    // 操作锁
    const TT = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }
    Send(Text('待更新...'))
    return
  },
  'message.create',
  /^(#|\/)升级宝库$/
)
