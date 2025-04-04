import { Text, useSend } from 'alemonjs'
import { controlByName } from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
import Xiuxian, { useCurrent, selects } from '@src/apps/index'
export const regular = /^(#|\/)?出售[\u4e00-\u9fa5]+\*\d+$/
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

    const UID = e.UserKey

    const UserData = useCurrent(e).UserData

    if (!(await controlByName(e, UserData))) return

    const text = e.MessageText

    const [thingName, quantity] = text.replace(/^(#|\/)?出售/, '').split('*')
    // 检查物品
    const thing = await GameApi.Bag.searchBagByName(UID, thingName)
    if (!thing) {
      Send(Text(`[万宝楼]欧阳峰\n没有[${thingName}]`))

      return
    }
    // 检查数量
    if (thing.acount < Number(quantity)) {
      Send(Text(`[万宝楼]欧阳峰\n数量不足`))

      return
    }
    // 先把物品去除,去除后必然空出一个背包位置
    await GameApi.Bag.reduceBagThing(UID, [
      {
        name: thing.name,
        acount: Number(quantity)
      }
    ])
    // 计算所得
    const commoditiesPrice = Math.floor(
      thing.price * Number(quantity) * GameApi.Cooling.ExchangeEnd
    )

    // 添加物品
    await GameApi.Bag.addBagThing(UID, [
      {
        name: '下品灵石',
        acount: commoditiesPrice
      }
    ])

    Send(Text(`[万宝楼]欧阳峰\n出售成功,获得${commoditiesPrice}*[下品灵石]`))

    return
  }
])
