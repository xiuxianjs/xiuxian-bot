import { Attributes, user } from '@src/xiuxian/db'
import { ControlByBlood, showAction } from '@xiuxian/api/index'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)向右$/.test(e.MessageText)) {
      next()
      return
    }
    const UID = e.UserKey
    const UserData = e['UserData'] as Attributes<typeof user>
    if (!(await ControlByBlood(e, UserData))) return
    UserData.pont_x += 10
    showAction(e, UID, UserData)
    return
  },
  ['message.create', 'private.message.create']
)
