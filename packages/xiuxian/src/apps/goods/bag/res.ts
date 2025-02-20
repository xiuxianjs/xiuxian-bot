import { pictureRender } from '@xiuxian/img/index'
import { backpackInformation } from '@xiuxian/statistics/index'
import { Goods, operationLock } from '@xiuxian/core/index'
import { Image, Text, useSend } from 'alemonjs'
import { Attributes, user } from '@src/xiuxian/db'

import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular =
  /^(#|\/)我的(储物袋|儲物袋|背包)(武器|护具|法宝|丹药|功法|道具|材料|装备)?$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
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

      const avatar = await e.UserAvatar.toURL()

      const img = await pictureRender('BagComponent', {
        data,
        theme: UserData?.theme ?? 'dark',
        avatar: avatar
      })
      if (typeof img != 'boolean') {
        Send(Image(img))
      }
      return
    }
  ],
  ['message.create', 'private.message.create']
)
