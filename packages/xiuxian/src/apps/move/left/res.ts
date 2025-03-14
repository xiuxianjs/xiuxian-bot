import { Attributes, user } from '@src/xiuxian/db'
import { ControlByBlood, showAction } from '@xiuxian/api/index'
import Xiuxian from '@src/apps/index'

export const regular = /^(#|\/)向左$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const UID = e.UserKey
      const UserData = e['UserData'] as Attributes<typeof user>
      if (!(await ControlByBlood(e, UserData))) return
      UserData.pont_x -= 10
      showAction(e, UID, UserData)
      return
    }
  ],
  ['message.create', 'private.message.create']
)
