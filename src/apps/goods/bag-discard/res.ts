import { Text, useParse, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import * as GameApi from '@xiuxian/core/index'
export default OnResponse(
  async e => {
    // lock start
    const T = await GameApi.operationLock(e.UserId)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    const UID = await getEmailUID(e.UserId)
    const text = useParse(e.Megs, 'Text')
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
  'message.create',
  /^(#|\/)(储物袋|儲物袋|背包)(丢弃|丟棄)[\u4e00-\u9fa5]+\*\d+$/
)
