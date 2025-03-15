import { Image, useSend } from 'alemonjs'
import { pictureRender } from '@xiuxian/img/index'
import * as Server from '@xiuxian/statistics/index'
import { Attributes, user } from '@src/xiuxian/db'
import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)查看杀神榜$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
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
])
