import { Image, Text, useSend } from 'alemonjs'

import { pictureRender } from '@xiuxian/img/index'
import * as Server from '@xiuxian/statistics/index'
import { operationLock } from '@src/xiuxian/core'
import { Attributes, user } from '@src/xiuxian/db'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)我的(戒指|(纳|呐|那)(借|介|戒))$/.test(e.MessageText)) {
      next()
      return
    }
    const TT = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey
    const UserData = e['UserData'] as Attributes<typeof user>
    const data = await Server.ringInformation(UID)
    const img = await pictureRender('BagComponent', {
      data,
      theme: UserData?.theme ?? 'dark'
    })

    if (typeof img != 'boolean') {
      Send(Image(img))
    }
  },
  ['message.create', 'private.message.create']
)
