import { ControlByBlood, showAction } from '@xiuxian/api/index'
import { createSelects } from 'alemonjs'
import Xiuxian, { useCurrent } from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)向上$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UID = e.UserKey
    const UserData = useCurrent(e).UserData
    if (!(await ControlByBlood(e, UserData))) return
    UserData.pont_y += 10
    showAction(e, UID, UserData)
    return
  }
])
