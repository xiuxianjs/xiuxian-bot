import { Text, useSend } from 'alemonjs'

import * as GameApi from '@xiuxian/core/index'
import { user_bag_message } from '@xiuxian/db/index'

import Xiuxian, { selects } from '@src/apps/index'

export const regular = /^(#|\/)?(储物袋|儲物袋|背包)(升级|升級)$/
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

    const UserBgData = await user_bag_message.findOneValue({
      where: {
        uid: UID
      }
    })

    // 等级
    let grade = UserBgData.grade

    // 等级
    const Price = GameApi.Cooling.Price[grade]

    if (!Price) {
      Send(Text('已是极品储物袋'))

      return
    }
    const thing = await GameApi.Bag.searchBagByName(UID, '下品灵石')
    if (!thing || thing.acount < Price) {
      Send(Text(`灵石不足\n需要准备[下品灵石]*${Price}`))

      return
    }

    // 加1
    grade++

    await user_bag_message.update(
      {
        grade: grade
      },
      {
        where: {
          uid: UID
        }
      }
    )

    // 扣灵石
    await GameApi.Bag.reduceBagThing(UID, [
      {
        name: '下品灵石',
        acount: Price
      }
    ])

    Send(Text(`花了${Price}*[下品灵石]升级\n目前储物袋等级为${grade}`))

    return
  }
])
