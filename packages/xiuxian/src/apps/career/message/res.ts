import { Text, useSend } from 'alemonjs'
import { ControlByBlood } from '@xiuxian/api/index'

import Xiuxian, { useCurrent, selects } from '@src/apps/index'

export const regular = /^(#|\/)?我的协会$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UserData = useCurrent(e).UserData
    if (!(await ControlByBlood(e, UserData))) return
    const Send = useSend(e)
    Send(Text('[协会执事]😳叶子凡\n暂未开放...'))
  }
])
