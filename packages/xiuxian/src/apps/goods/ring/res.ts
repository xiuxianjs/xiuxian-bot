import { Image, Text, useSend } from 'alemonjs'
import * as Server from '@xiuxian/statistics/index'
import { operationLock } from '@src/xiuxian/core'
import Xiuxian, { useCurrent, selects } from '@src/apps/index'
import { renderComponentToBuffer } from 'jsxp'
import XBag from '@src/xiuxian/img/src/views/XBag'
export const regular = /^(#|\/)?我的(戒指|(纳|呐|那)(借|介|戒))$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const TT = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey
    const UserData = useCurrent(e).UserData
    const data = await Server.ringInformation(UID)

    const avatar = await e.UserAvatar.toURL()

    const img = await renderComponentToBuffer('bag/' + data.UID, XBag, {
      data: data as unknown,
      theme: UserData?.theme ?? 'dark',
      avatar: avatar
    })

    if (typeof img != 'boolean') {
      Send(Image(img))
    }
  }
])
