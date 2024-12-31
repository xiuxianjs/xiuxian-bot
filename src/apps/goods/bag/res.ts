import { pictureRender } from '@xiuxian/img/index'
import { backpackInformation } from '@xiuxian/statistics/index'
import { Goods, operationLock } from '@xiuxian/core/index'
import { Image, Text, useSend } from 'alemonjs'
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
    if (
      !/^(#|\/)我的(储物袋|儲物袋|背包)(武器|护具|法宝|丹药|功法|道具|材料|装备)?$/.test(
        e.MessageText
      )
    ) {
      next()
      return
    }
    const TT = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }
    const UserData = e['UserData'] as Attributes<typeof user>
    const text = e.MessageText
    const typing = text.replace(/^(#|\/)我的(储物袋|儲物袋|背包)/, '')

    const UID = e.UserKey
    const data = await backpackInformation(
      UID,
      Goods.mapType[typing] ?? Goods.mapType['道具']
    )
    const img = await pictureRender('BagComponent', {
      data,
      theme: UserData?.theme ?? 'dark'
    })
    if (typeof img != 'boolean') {
      Send(Image(img))
    }
    return
  },
  ['message.create', 'private.message.create']
)
