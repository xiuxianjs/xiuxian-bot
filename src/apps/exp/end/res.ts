import { operationLock } from '@src/xiuxian/core'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { isUser, endAllWord } from '@xiuxian/api/index'
import { Text, useSend } from 'alemonjs'
export default OnResponse(
  async e => {
    // 操作锁
    const TT = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return
    endAllWord(e, UID, UserData)
    return
  },
  'message.create',
  /^(#|\/)?(归来|歸來|凝脉|出关|出關|聚灵|聚靈)$/
)
