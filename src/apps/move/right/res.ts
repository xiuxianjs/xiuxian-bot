import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { Attributes, user } from '@src/xiuxian/db'
import { ControlByBlood, showAction } from '@xiuxian/api/index'
export default OnResponse(
  async (e, next) => {
    if (!/^(#|\/)向右$/.test(e.MessageText)) {
      next()
      return
    }
    const UID = await getEmailUID(e.UserKey)
    const UserData = e['UserData'] as Attributes<typeof user>
    if (!(await ControlByBlood(e, UserData))) return
    UserData.pont_x += 10
    showAction(e, UID, UserData)
    return
  },
  ['message.create', 'private.message.create']
)
