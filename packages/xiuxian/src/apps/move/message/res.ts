import { Text, useSend } from 'alemonjs'

import Xiuxian, { useCurrent, selects } from '@src/apps/index'

export const regular = /^(#|\/)我的坐标$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UserData = useCurrent(e).UserData
    const Send = useSend(e)
    Send(Text(`坐标(${UserData.pont_x},${UserData.pont_y},${UserData.pont_z})`))
    return
  }
])
