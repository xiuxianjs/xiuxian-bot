import { Text, useSend } from 'alemonjs'
import * as GameApi from '@xiuxian/core/index'
import { user, user_equipment } from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^(#|\/)?卸下[\u4e00-\u9fa5]+$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // lock start
    // 操作锁
    const TT = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    // lock end
    const UID = e.UserKey
    // message
    const text = e.MessageText
    const thingName = text.replace(/^(#|\/)?卸下/, '')
    // 得到数据
    const equipment = await user_equipment.findAllValues({
      where: { uid: UID }
    })
    const islearned = equipment.find(item => item.name == thingName)
    if (!islearned) return

    // 检查背包
    const BagSize = await GameApi.Bag.backpackFull(UID)
    if (!BagSize) {
      Send(Text('储物袋空间不足'))
      return
    }

    // 删除
    await user_equipment.destroy({
      where: { uid: UID, name: thingName, id: islearned.id }
    })

    // 收回装备
    await GameApi.Bag.addBagThing(UID, [
      {
        name: thingName,
        acount: 1
      }
    ])

    // 反馈
    setTimeout(async () => {
      const UserData = await user.findOneValue({
        where: {
          uid: UID
        }
      })
      // 更新
      await GameApi.Equipment.updatePanel(UID, UserData.battle_blood_now)

      Send(Text(`卸下[${thingName}]`))
    }, 1500)
    return
  }
])
