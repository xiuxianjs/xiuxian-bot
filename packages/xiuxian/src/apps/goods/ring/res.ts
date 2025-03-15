import { Image, Text, useSend } from 'alemonjs'

import { pictureRender } from '@xiuxian/img/index'
import * as Server from '@xiuxian/statistics/index'
import { operationLock } from '@src/xiuxian/core'
import { createSelects } from 'alemonjs'
import Xiuxian, { useCurrent } from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)我的(戒指|(纳|呐|那)(借|介|戒))$/
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

    const img = await pictureRender('BagComponent', {
      data,
      theme: UserData?.theme ?? 'dark',
      avatar: avatar
    })

    if (typeof img != 'boolean') {
      Send(Image(img))
    }
  }
])
