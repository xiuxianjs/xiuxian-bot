import { Text, useSend } from 'alemonjs'

import { Attributes, user } from '@xiuxian/db/index'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)战斗过程(开启|关闭)$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
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
    }
  ],
  ['message.create', 'private.message.create']
)
