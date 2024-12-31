import { pictureRender } from '@xiuxian/img/index'
import { backpackInformation } from '@xiuxian/statistics/index'
import { Goods, operationLock } from '@xiuxian/core/index'
import { Image, Text, useSend } from 'alemonjs'
import { Attributes, user } from '@src/xiuxian/db'
export default OnResponse(
  async (e, next) => {
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
    console.log('typing', typing)
    const data = await backpackInformation(
      e.UserKey,
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
