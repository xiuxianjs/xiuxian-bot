import { Attributes, user } from '@src/xiuxian/db'
import { ControlByBlood, showAction } from '@xiuxian/api/index'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)向右$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const UID = e.UserKey
      const UserData = e['UserData'] as Attributes<typeof user>
      if (!(await ControlByBlood(e, UserData))) return
      UserData.pont_x += 10
      showAction(e, UID, UserData)
      return
    }
  ],
  ['message.create', 'private.message.create']
)
