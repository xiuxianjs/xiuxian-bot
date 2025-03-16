import { Text, useSend } from 'alemonjs'
import { fate_level, goods, user_fate, user_level } from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
import { Talent } from '@xiuxian/core/index'
export const regular = /^(#|\/)我的本命物$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // 操作锁
    const UID = e.UserKey
    // 查看本命信息：武器名/等级/属性/强化需要消耗提示
    const thing = await user_fate
      .findOne({
        where: {
          uid: UID
        },
        include: {
          model: goods
        }
      })
      .then(res => res?.dataValues)
    const Send = useSend(e)
    if (!thing) {
      Send(Text('未有本命物'))
      return
    }
    // 查看消耗所需
    const data = await fate_level
      .findOne({
        where: {
          grade: thing.grade
        }
      })
      .then(res => res?.dataValues)
    // 得到该境界经验
    const exp_gaspractice = await user_level
      .findOne({
        where: {
          uid: UID,
          type: 1
        }
      })
      .then(res => res?.dataValues)
      .then(res => res.experience)
    //
    const exp_bodypractice = await user_level
      .findOne({
        where: {
          uid: UID,
          type: 2
        }
      })
      .then(res => res?.dataValues)
      .then(res => res.experience)
    //
    const exp_soul = await user_level
      .findOne({
        where: {
          uid: UID,
          type: 3
        }
      })
      .then(res => res?.dataValues)
      .then(res => res.experience)

    const goodThing = await goods.findOneValue({
      where: {
        name: thing.name
      }
    })

    // 强化等级*1000*物品等级
    const size = 1000 * goodThing.grade

    const be = await Talent.getTalentName(thing['good']['dataValues']['talent'])

    if (thing.grade >= 10) {
      Send(
        Text(
          [`本命物:${thing.name}`, `等级:${thing.grade}`, `属性:${be}`].join(
            '\n'
          )
        )
      )
      return
    }

    Send(
      Text(
        [
          `本命物:${thing.name}`,
          `等级:${thing.grade}`,
          `属性:${be}`,
          `强化所需物品:${thing.name}`,
          `强化所需灵石:${size}`,
          `强化所需修为:${exp_gaspractice}/${data.exp_gaspractice}`,
          `强化所需气血:${exp_bodypractice}/${data.exp_bodypractice}`,
          `强化所需魂念:${exp_soul}/${data.exp_soul}`
        ].join('\n')
      )
    )

    return
  }
])
