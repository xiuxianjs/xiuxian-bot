import { Image, useSend } from 'alemonjs'
import { pictureRender } from '@xiuxian/img/index'
import * as Server from '@xiuxian/statistics/index'
import { Attributes, user } from '@src/xiuxian/db'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)查看杀神榜$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
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
    }
  ],
  ['message.create', 'private.message.create']
)
