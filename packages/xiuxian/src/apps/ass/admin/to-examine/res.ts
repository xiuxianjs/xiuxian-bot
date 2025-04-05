import { sendReply } from '@xiuxian/api/index'
import * as DB from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
import { Text, useSend } from 'alemonjs'
import { operationLock } from '@src/xiuxian/core'
export const regular = /^(#|\/)?审核[\u4e00-\u9fa5]+$/
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

    // 审核 宗门名称
    const name = text.replace(/^(#|\/)?审核/, '')

    const aData = await DB.ass
      .findOne({
        where: {
          name: name
        },
        include: [
          {
            model: DB.ass_typing
          }
        ]
      })
      .then(res => res?.dataValues)

    // 不存在
    if (!aData) {
      Send(Text('势力不存在'))
      return false
    }

    //
    const UserAss = await DB.user_ass.findOneValue({
      where: {
        uid: UID, // uid
        aid: aData.id
      }
    })

    // 不存在，或者 9
    if (!UserAss) {
      Send(Text('不属于' + name))
      return
    }

    // 大于4
    if (UserAss.authentication >= 4) {
      Send(Text('权能不足'))
      return
    }

    const uData = await DB.user_ass_apply
      .findAll({
        where: {
          aid: aData.id
        },
        include: [
          {
            model: DB.user
          }
        ]
      })
      .then(res => res.map(item => item?.dataValues))

    //
    if (!uData || uData.length == 0) {
      Send(Text('暂无申请'))
      return
    }

    const msg: string[] = []
    for (const item of uData) {
      const usermsg = item['user']['dataValues']
      msg.push(`标记:${item.id}_编号:${usermsg.uid}\n昵称:${usermsg.name}`)
    }
    sendReply(Send, `[${aData.name}名录]`, msg)
    return
  }
])
