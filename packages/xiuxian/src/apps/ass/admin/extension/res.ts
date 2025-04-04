import { Bag, Cooling, operationLock } from '@src/xiuxian/core'
import { ass, user_ass } from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
import { Text, useSend } from 'alemonjs'
export const regular = /^(#|\/)?升级[\u4e00-\u9fa5]+$/
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

    const UID = e.UserKey

    const text = e.MessageText
    const name = text.replace(/^(#|\/)?升级/, '')

    const aData = await ass.findOneValue({
      where: {
        name: name
      }
    })

    // 不存在
    if (!aData) {
      Send(Text('势力不存在'))
      return false
    }

    //
    const UserAss = await user_ass.findOneValue({
      where: {
        uid: UID, // uid
        aid: aData.id
      }
    })

    // 不存在，或者 9
    if (!UserAss || UserAss?.authentication == 9) {
      Send(Text('不属于该宗门'))
      return
    }

    // 大于4
    if (UserAss.authentication >= 4) {
      Send(Text('权能不足'))
      return
    }

    //
    if (aData.grade > 4) {
      Send(Text('宗门等级已达最高'))
      return
    }

    //
    const goods = await Bag.searchBagByName(UID, '开天令')

    //
    const num = Cooling.AssGradesNeed[aData.grade]

    if (!num) {
      Send(Text('已经是最高级势力'))
      return
    }

    //
    if (!goods) {
      Send(Text('你没有开天令'))
      return
    }

    //
    if (goods.acount < num) {
      Send(Text(`开天令不足${num}`))
      return
    }

    //
    await Bag.reduceBagThing(UID, [{ name: '开天令', acount: num }])

    //
    await ass.update(
      { grade: aData.grade + 1 },
      {
        where: {
          id: aData.id
        }
      }
    )

    Send(Text('升级成功'))

    return
  }
])
