import { Image, useSend } from 'alemonjs'
import { pictureRender } from '@xiuxian/img/index'
import * as Server from '@xiuxian/statistics/index'
import { Attributes, user } from '@src/xiuxian/db'
export default OnResponse(
  async (e, next) => {
    if (!/^(#|\/)查看杀神榜$/.test(e.MessageText)) {
      next()
      return
    }
    const UserData = e['UserData'] as Attributes<typeof user>
    const data = await Server.getKillList()
    const img = await pictureRender('KillComponent', {
      data,
      theme: UserData?.theme ?? 'dark'
    })
    const Send = useSend(e)
    if (typeof img != 'boolean') {
      Send(Image(img))
    }
  },
  ['message.create', 'private.message.create']
)
