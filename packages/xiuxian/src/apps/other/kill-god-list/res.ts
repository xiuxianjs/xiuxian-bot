import { Image, useSend } from 'alemonjs'
import { pictureRender } from '@xiuxian/img/index'
import * as Server from '@xiuxian/statistics/index'

import Xiuxian, { useCurrent, selects } from '@src/apps/index'

export const regular = /^(#|\/)?查看杀神榜$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UserData = useCurrent(e).UserData
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
