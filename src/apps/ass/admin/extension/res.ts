import { Bag, Cooling, operationLock } from '@src/xiuxian/core'
import { ass, user_ass } from '@xiuxian/db/index'
import { Text, useSend } from 'alemonjs'

import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)升级[\u4e00-\u9fa5]+$/.test(e.MessageText)) {
      next()
      return
    }
    // 操作锁
    const TT = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey

    const text = e.MessageText
    const name = text.replace(/^(#|\/)升级/, '')

    const aData = await ass
      .findOne({
        where: {
          name: name
        }
      })
      .then(res => res?.dataValues)

    // 不存在
    if (!aData) {
      Send(Text('势力不存在'))
      return false
    }

    //
    const UserAss = await user_ass
      .findOne({
        where: {
          uid: UID, // uid
          aid: aData.id
        }
      })
      .then(res => res?.dataValues)

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
  },
  ['message.create', 'private.message.create']
)
