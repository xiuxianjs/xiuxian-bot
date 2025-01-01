import { Attributes, user } from '@src/xiuxian/db'
import { ControlByBlood, showAction } from '@xiuxian/api/index'
import Xiuxian from '@src/apps/index'
export const regular = /^(#|\/)向下$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)向下$/.test(e.MessageText)) {
        next()
        return
      }
      const UID = e.UserKey
      const UserData = e['UserData'] as Attributes<typeof user>
      if (!(await ControlByBlood(e, UserData))) return
      UserData.pont_y -= 10
      showAction(e, UID, UserData)
      return
    }
  ],
  ['message.create', 'private.message.create']
)
