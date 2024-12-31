import { Text, useSend } from 'alemonjs'
import { Attributes, user } from '@src/xiuxian/db'
export default OnResponse(
  async (e, next) => {
    if (!/^(#|\/)我的坐标$/.test(e.MessageText)) {
      next()
      return
    }
    const UserData = e['UserData'] as Attributes<typeof user>
    const Send = useSend(e)
    Send(Text(`坐标(${UserData.pont_x},${UserData.pont_y},${UserData.pont_z})`))
    return
  },
  ['message.create', 'private.message.create']
)
