import { operationLock } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
export default OnResponse(
  async e => {
    const TT = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }
    // const UserData = e['UserData'] as Attributes<typeof user>
    // const UID = await getEmailUID(e.UserId)

    return
  },
  'message.create',
  /^(#|\/)退出秘境$/
)
