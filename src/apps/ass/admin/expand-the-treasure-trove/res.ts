import { isUser } from '@xiuxian/api/index'
import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
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

    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return

    Send(Text('待更新...'))

    return
  },
  'message.create',
  /^(#|\/)?升级宝库$/
)
