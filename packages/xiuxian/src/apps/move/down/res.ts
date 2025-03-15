import { Attributes, user } from '@src/xiuxian/db'
import { ControlByBlood, showAction } from '@xiuxian/api/index'
import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)向下$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UID = e.UserKey
    const UserData = e['UserData'] as Attributes<typeof user>
    if (!(await ControlByBlood(e, UserData))) return
    UserData.pont_y -= 10
    showAction(e, UID, UserData)
    return
  }
])
