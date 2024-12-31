import { Text, useSend } from 'alemonjs'

import * as GameApi from '@xiuxian/core/index'
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
      !/^(#|\/)(储物袋|儲物袋|背包)(丢弃|丟棄)[\u4e00-\u9fa5]+\*\d+$/.test(
        e.MessageText
      )
    ) {
      next()
      return
    }
    // lock start
    const T = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    const UID = e.UserKey
    const text = e.MessageText
    const [thingName, quantity] = text
      .replace(/^(#|\/)(储物袋|儲物袋|背包)(丢弃|丟棄)/, '')
      .split('*')
    const thing = await GameApi.Bag.searchBagByName(UID, thingName)
    if (!thing) {
      Send(Text(`没[${thingName}]`))
      return
    }
    await GameApi.Bag.reduceBagThing(UID, [
      {
        name: thing.name,
        acount: Number(quantity)
      }
    ])
    Send(Text(`丢弃[${thingName}]*${quantity}`))
    return
  },
  ['message.create', 'private.message.create']
)
