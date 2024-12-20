import { operationLock } from '@src/xiuxian/core'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { Attributes, user } from '@src/xiuxian/db'
import { endAllWord } from '@xiuxian/api/index'
import { Text, useSend } from 'alemonjs'
export default OnResponse(async (e, next) => {
  if (!/^(#|\/)(归来|歸來|凝脉|出关|出關|聚灵|聚靈)$/.test(e.MessageText)) {
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

  const UID = await getEmailUID(e.UserKey)
  const UserData = e['UserData'] as Attributes<typeof user>
  endAllWord(e, UID, UserData)
  return
}, 'message.create')
