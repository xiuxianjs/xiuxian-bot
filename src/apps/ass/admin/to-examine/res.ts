import { isUser, sendReply } from '@xiuxian/api/index'
import * as DB from '@xiuxian/db/index'
import { Text, useParse, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return
    const text = useParse(e.Megs, 'Text')

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

    const Send = useSend(e)

    // 不存在
    if (!aData) {
      console.log('势力不存在', aData)
      return false
    }

    //
    const UserAss = await DB.user_ass
      .findOne({
        where: {
          uid: UID, // uid
          aid: aData.id
        }
      })
      .then(res => res?.dataValues)

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

    const msg = []
    for (const item of uData) {
      const usermsg = item['user']['dataValues']
      msg.push(`标记:${item.id}_编号:${usermsg.uid}\n昵称:${usermsg.name}`)
    }
    sendReply(e, `[${aData.name}名录]`, msg)
    return
  },
  'message.create',
  /^(#|\/)?审核[\u4e00-\u9fa5]+$/
)
