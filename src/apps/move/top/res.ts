import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { Attributes, user } from '@src/xiuxian/db'
import { ControlByBlood, showAction } from '@xiuxian/api/index'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)
    const UserData = e['UserData'] as Attributes<typeof user>
    if (!(await ControlByBlood(e, UserData))) return
    UserData.pont_y += 10
    showAction(e, UID, UserData)
    return
  },
  'message.create',
  /^(#|\/)?向上$/
)
