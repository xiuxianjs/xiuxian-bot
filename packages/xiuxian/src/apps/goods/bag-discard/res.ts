import { Text, useSend } from 'alemonjs'

import * as GameApi from '@xiuxian/core/index'
import Xiuxian from '@src/apps/index'

export const regular =
  /^(#|\/)(储物袋|儲物袋|背包)(丢弃|丟棄)[\u4e00-\u9fa5]+\*\d+$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
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
    }
  ],
  ['message.create', 'private.message.create']
)
