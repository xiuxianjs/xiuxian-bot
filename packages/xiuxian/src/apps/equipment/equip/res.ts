import { Text, useSend } from 'alemonjs'

import * as GameApi from '@xiuxian/core/index'
import { user, user_equipment } from '@xiuxian/db/index'

import Xiuxian, { selects } from '@src/apps/index'

export const regular = /^(#|\/)?(装备|裝備)[\u4e00-\u9fa5]+$/
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

    const text = e.MessageText
    const thingName = text.replace(/^(#|\/)?(装备|裝備)/, '')

    const thing = await GameApi.Bag.searchBagByName(UID, thingName)
    if (!thing) {
      Send(Text(`没有[${thingName}]`))
      return
    }

    //
    const equipment = await user_equipment.findAllValues({
      where: { uid: UID }
    })

    //
    if (equipment.length >= GameApi.Cooling.myconfig_equipment) {
      Send(Text('拿不下了'))

      return
    }
    // 装备
    await user_equipment.create({ uid: UID, name: thing.name })

    // 扣除物品
    await GameApi.Bag.reduceBagThing(UID, [
      {
        name: thing.name,
        acount: 1
      }
    ])

    // 响应消息
    setTimeout(async () => {
      const UserData = await user.findOneValue({
        where: {
          uid: UID
        }
      })
      // 更新
      await GameApi.Equipment.updatePanel(UID, UserData.battle_blood_now)
      // 响应

      Send(Text(`装备[${thingName}]`))
    }, 1500)
    return
  }
])
