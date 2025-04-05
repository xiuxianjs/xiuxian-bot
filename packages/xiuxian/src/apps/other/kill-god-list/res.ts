import { Image, useSend } from 'alemonjs'
import * as Server from '@xiuxian/statistics/index'
import Xiuxian, { useCurrent, selects } from '@src/apps/index'
import { renderComponentToBuffer } from 'jsxp'
import XKill from '@src/xiuxian/img/src/views/XKill'
export const regular = /^(#|\/)?查看杀神榜$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UserData = useCurrent(e).UserData
    const data = await Server.getKillList()
    const img = await renderComponentToBuffer('KillComponent', XKill, {
      data,
      theme: UserData?.theme ?? 'dark'
    })
    const Send = useSend(e)
    if (typeof img != 'boolean') {
      Send(Image(img))
    }
  }
])
