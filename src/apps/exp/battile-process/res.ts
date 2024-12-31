import { Text, useSend } from 'alemonjs'

import { Attributes, user } from '@xiuxian/db/index'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)战斗过程(开启|关闭)$/.test(e.MessageText)) {
      next()
      return
    }
    const UID = e.UserKey

    const UserData = e['UserData'] as Attributes<typeof user>

    const text = e.MessageText

    if (new RegExp(/战斗过程开启/).test(text)) {
      UserData.battle_show = 1
    } else {
      UserData.battle_show = 0
    }

    await user.update(
      {
        battle_show: UserData.battle_show
      },
      {
        where: {
          uid: UID
        }
      }
    )

    const Send = useSend(e)

    if (UserData.battle_show == 1) {
      Send(Text('战斗过程开启'))

      return
    } else {
      Send(Text('战斗过程关闭'))

      return
    }
  },
  ['message.create', 'private.message.create']
)
