import { Text, useSend } from 'alemonjs'
import { operationLock } from '@src/xiuxian/core'
export default OnResponse(async (e, next) => {
  if (!/^(#|\/)升级宝库$/.test(e.MessageText)) {
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
  Send(Text('待更新...'))
  return
}, 'message.create')
