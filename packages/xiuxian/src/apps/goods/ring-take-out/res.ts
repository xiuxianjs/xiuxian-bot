import { Text, useSend } from 'alemonjs'

import * as GameApi from '@xiuxian/core/index'

import Xiuxian, { selects } from '@src/apps/index'
export const regular =
  /^(#|\/)?(戒指|(纳|呐|那)(借|介|戒))取出[\u4e00-\u9fa5]+\*\d+$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // lock start
    const T = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }

    // lock end
    const UID = e.UserKey
    // 解析消息
    const text = e.MessageText
    const [thingName, thingAcount] = text
      .replace(/^(#|\/)?(戒指|(纳|呐|那)(借|介|戒))取出/, '')
      .split('*')
    // 检查戒指
    const thing = await GameApi.Ring.searchRingByName(UID, thingName)
    if (!thing) {
      Send(Text(`没有[${thingName}]`))

      return
    }
    if (thing.acount < Number(thingAcount)) {
      Send(Text('数量不足'))

      return
    }
    // 检查储物袋有没有这个物品
    const BagThing = await GameApi.Bag.searchBagByName(UID, thingName)
    // 检查储物袋空间
    const BagSize = await GameApi.Bag.backpackFull(UID)
    // 背包满位置了直接返回了
    if (!BagThing && !BagSize) {
      Send(Text('储物袋空间不足'))

      return
    }

    // 戒指减少
    await GameApi.Ring.reduceRingThing(UID, [
      {
        name: thingName,
        acount: Number(thingAcount)
      }
    ])

    // 储物袋增加
    await GameApi.Bag.addBagThing(UID, [
      {
        name: thingName,
        acount: Number(thingAcount)
      }
    ])

    Send(Text('取出成功' + thingName))

    return
  }
])
