import { Text, useSend } from 'alemonjs'
import { Attributes, user } from '@src/xiuxian/db'
import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)我的坐标$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UserData = e['UserData'] as Attributes<typeof user>
    const Send = useSend(e)
    Send(Text(`坐标(${UserData.pont_x},${UserData.pont_y},${UserData.pont_z})`))
    return
  }
])
