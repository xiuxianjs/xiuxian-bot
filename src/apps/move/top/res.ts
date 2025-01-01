import { Attributes, user } from '@src/xiuxian/db'
import { ControlByBlood, showAction } from '@xiuxian/api/index'
import Xiuxian from '@src/apps/index'
export const regular = /^(#|\/)向上$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)向上$/.test(e.MessageText)) {
        next()
        return
      }
      const UID = e.UserKey
      const UserData = e['UserData'] as Attributes<typeof user>
      if (!(await ControlByBlood(e, UserData))) return
      UserData.pont_y += 10
      showAction(e, UID, UserData)
      return
    }
  ],
  ['message.create', 'private.message.create']
)
