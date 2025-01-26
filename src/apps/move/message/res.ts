import { Text, useSend } from 'alemonjs'
import { Attributes, user } from '@src/xiuxian/db'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)我的坐标$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const UserData = e['UserData'] as Attributes<typeof user>
      const Send = useSend(e)
      Send(
        Text(`坐标(${UserData.pont_x},${UserData.pont_y},${UserData.pont_z})`)
      )
      return
    }
  ],
  ['message.create', 'private.message.create']
)
