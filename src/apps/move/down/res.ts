import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { ControlByBlood, isUser, showAction } from '@xiuxian/api/index'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return
    if (!(await ControlByBlood(e, UserData))) return
    UserData.pont_y -= 10
    showAction(e, UID, UserData)
    return
  },
  'message.create',
  /^(#|\/)?向下$/
)
