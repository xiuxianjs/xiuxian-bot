import { Text, useParse, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { Attributes, user } from '@xiuxian/db/index'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)

    const UserData = e['UserData'] as Attributes<typeof user>

    const text = useParse(e.Megs, 'Text')

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
  'message.create',
  /^(#|\/)战斗过程(开启|关闭)$/
)
