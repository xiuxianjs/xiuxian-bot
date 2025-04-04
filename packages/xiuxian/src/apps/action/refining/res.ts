import { user_fate, user_level } from '@xiuxian/db/index'
import { Bag, Equipment, Levels } from '@xiuxian/core/index'
import { operationLock } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import Xiuxian, { selects, useCurrent } from '@src/apps/index'
export const regular = /^(#|\/)?炼化[\u4e00-\u9fa5]+$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // 操作锁
    const TT = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }
    // 检查用户
    const UID = e.UserKey
    const UserData = useCurrent(e).UserData
    const T = await user_fate.findOneValue({
      where: {
        uid: UID
      }
    })
    if (T) {
      Send(Text('已有本命物'))
      return
    }
    // 解析
    const text = e.MessageText
    const thingName = text.replace(/^(#|\/)?炼化/, '')
    const bagThing = await Bag.searchBagByName(UID, thingName)
    if (!bagThing) {
      Send(Text(`没[${thingName}]`))
      return
    }
    // 根据物品等级来消耗修为  1000
    const size = bagThing.grade * 1000
    // 看看经验
    const LevelMsg = await user_level.findOneValue({
      where: {
        uid: UID,
        type: 1
      }
    })
    if (LevelMsg.experience < size) {
      Send(Text(`需要消耗[修为]*${size}~`))
      return
    }
    // 减少修为
    await Levels.reduceExperience(UID, 1, size)
    // 新增数据
    await user_fate.create({
      uid: UID,
      name: bagThing.name,
      grade: 0
    })
    // 减少物品
    await Bag.reduceBagThing(UID, [{ name: thingName, acount: 1 }])
    // 更新面板?
    await Equipment.updatePanel(UID, UserData.battle_blood_now)
    // 返回
    Send(Text(`炼化[${bagThing.name}]`))
    return
  }
])
