import { Text, useSend } from 'alemonjs'
import { ControlByBlood } from '@xiuxian/api/index'
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
    if (!/^(#|\/)我的协会$/.test(e.MessageText)) {
      next()
      return
    }
    const UserData = e['UserData'] as Attributes<typeof user>
    if (!(await ControlByBlood(e, UserData))) return
    const Send = useSend(e)
    Send(Text('[协会执事]😳叶子凡\n暂未开放...'))
  },
  ['message.create', 'private.message.create']
)
