import { Bag, Levels, operationLock } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import { user_fate, user_level } from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
const reGiveup = {}
export const regular = /^(#|\/)?剥离本命物$/
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

    // 不存在 或者过期了
    if (!reGiveup[UID] || reGiveup[UID] + 30000 < Date.now()) {
      reGiveup[UID] = Date.now()
      Send(
        Text(
          [
            '[重要提示]\n请30s内再次发送[/剥离本命物]',
            '\n以确认剥离本命物'
          ].join('')
        )
      )
      return
    }

    // 根据物品等级来消耗气血  1000
    const size = thing.grade * 1000
    // 看看经验
    const LevelMsg = await user_level.findOneValue({
      where: {
        uid: UID,
        type: 2
      }
    })
    if (LevelMsg.experience < size) {
      Send(Text(`需要消耗[气血]*${size}~`))
      return
    }

    const BagSize = await Bag.backpackFull(UID)
    // 背包未位置了直接返回了
    if (!BagSize) {
      Send(Text('储物袋空间不足'))
      return
    }

    // 清除询问
    delete reGiveup[UID]

    // 减少气血
    await Levels.reduceExperience(UID, 1, size)
    // 返回物品
    await Bag.addBagThing(UID, [
      {
        name: thing.name,
        acount: thing.grade + 1
      }
    ])
    // 删除数据
    await user_fate.destroy({
      where: {
        uid: UID
      }
    })
    Send(Text(`成功从灵根处取出[${thing.name}]`))
    return
  }
])
