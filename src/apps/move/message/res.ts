import { Text, useSend } from 'alemonjs'
import { Attributes, user } from '@src/xiuxian/db'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
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
