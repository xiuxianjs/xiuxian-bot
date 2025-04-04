import { fate_level, user_fate, user_level } from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
import { Bag, Levels } from '@xiuxian/core/index'
import { operationLock } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
export const regular = /^(#|\/)?强化本命物$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // 操作锁
    const T = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    // 检查用户
    const UID = e.UserKey
    const thing = await user_fate.findOneValue({
      where: {
        uid: UID
      }
    })
    //
    if (!thing) {
      Send(Text('未有本命物'))
      return
    }
    if (thing.grade == 10) {
      Send(Text('本命物品质已至仙品'))
      return
    }
    // 强化是否有同名
    const bagThing = await Bag.searchBagByName(UID, thing.name)
    if (!bagThing) {
      Send(Text(`没[${thing.name}]`))
      return
    }
    // 强化等级*1000*物品等级
    const size = 1000 * bagThing.grade
    // 是否拥有固定灵石
    const lingshi = await Bag.searchBagByName(UID, '下品灵石')
    if (!lingshi || lingshi.acount < size) {
      Send(Text(`需要[下品灵石]*${size}`))
      return
    }

    // 得到门槛所需
    const udata = await fate_level.findOneValue({
      where: {
        grade: thing.grade
      }
    })

    // 得到境界剩余经验
    const exp_gaspractice = await user_level
      .findOneValue({
        where: {
          uid: UID,
          type: 1
        }
      })
      .then(res => res.experience)

    const exp_bodypractice = await user_level
      .findOneValue({
        where: {
          uid: UID,
          type: 2
        }
      })
      .then(res => res.experience)

    const exp_soul = await user_level
      .findOneValue({
        where: {
          uid: UID,
          type: 3
        }
      })
      .then(res => res.experience)

    if (
      exp_gaspractice < udata.exp_gaspractice ||
      exp_bodypractice < udata.exp_bodypractice ||
      exp_soul < udata.exp_soul
    ) {
      Send(Text('当前[修为/气血/神念]不足以强化本命物'))
      return
    }

    // 减少物品 | 灵石
    await Bag.reduceBagThing(UID, [
      {
        name: thing.name,
        acount: 1
      },
      {
        name: '下品灵石',
        acount: size
      }
    ])

    // 减少经验
    await Levels.reduceExperience(UID, 1, udata.exp_gaspractice)
    await Levels.reduceExperience(UID, 2, udata.exp_bodypractice)
    await Levels.reduceExperience(UID, 3, udata.exp_soul)

    const grade = thing.grade + 1

    // 更新强化等级
    await user_fate.update(
      {
        grade: grade
      },
      {
        where: {
          uid: UID
        }
      }
    )
    Send(Text(`[${thing.name}]强化至${grade}级`))
  }
])
