import { isUser } from '@xiuxian/api/index'
import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return

    const Send = useSend(e)
    Send(Text('待更新...'))

    return
  },
  'message.create',
  /^(#|\/)?升级宝库$/
)
