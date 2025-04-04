import { ControlByBlood, showAction } from '@xiuxian/api/index'

import Xiuxian, { useCurrent, selects } from '@src/apps/index'

export const regular = /^(#|\/)?向下$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UID = e.UserKey
    const UserData = useCurrent(e).UserData
    if (!(await ControlByBlood(e, UserData))) return
    UserData.pont_y -= 10
    showAction(e, UID, UserData)
    return
  }
])
