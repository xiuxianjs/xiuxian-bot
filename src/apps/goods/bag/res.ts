import { pictureRender } from '@xiuxian/img/index'
import { backpackInformation } from '@xiuxian/statistics/index'
import { Goods, operationLock } from '@xiuxian/core/index'
import { Image, Text, useParse, useSend } from 'alemonjs'
import { Attributes, user } from '@src/xiuxian/db'
export default OnResponse(
  async e => {
    const TT = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UserData = e['UserData'] as Attributes<typeof user>
    const text = useParse(e.Megs, 'Text')
    const typing = text.replace(/^(#|\/)我的(储物袋|儲物袋|背包)/, '')
    console.log('typing', typing)
    const data = await backpackInformation(
      e.UserId,
      e.UserAvatar,
      Goods.mapType[typing] ?? Goods.mapType['道具']
    )
    const img = await pictureRender('BagComponent', {
      data,
      theme: UserData?.theme ?? 'dark'
    })
    if (typeof img != 'boolean') {
      Send(Image(img, 'buffer'))
    }
    return
  },
  'message.create',
  /^(#|\/)我的(储物袋|儲物袋|背包)(武器|护具|法宝|丹药|功法|道具|材料|装备)?$/
)
