import { Text, useSend } from 'alemonjs'

import { user } from '@xiuxian/db/index'

import Xiuxian, { useCurrent, selects } from '@src/apps/index'

export const regular = /^(#|\/)战斗过程(开启|关闭)$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UID = e.UserKey

    const UserData = useCurrent(e).UserData

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
])
