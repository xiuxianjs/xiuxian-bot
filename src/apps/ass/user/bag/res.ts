import { Text, useParse, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { isUser } from '@xiuxian/api/index'
import * as DB from '@xiuxian/db/index'
// 查看该宗门都有谁
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return
    const text = useParse(e.Megs, 'Text')
    //
    const name = text.replace(/(#|\/|包库)/g, '')

    const AData = await DB.ass
      .findOne({
        where: {
          name: name
        }
      })
      .then(res => res?.dataValues)
      .catch(err => console.error(err))

    const Send = useSend(e)
    if (!AData) {
      Send(Text('该势力不存在'))
      return
    }

    // 查看个人信息，确保有权限
    const UADatas = await DB.user_ass
      .findAll({
        where: {
          aid: AData.id
        },
        include: [
          {
            model: DB.user
          },
          {
            model: DB.ass,
            include: [
              {
                model: DB.ass_typing
              }
            ]
          }
        ]
      })
      .then(res => res.map(res => res.dataValues))

    if (!UADatas) {
      Send(Text('势力数据异常'))
      return
    }

    const UAData = UADatas.find(item => item.uid == UID)

    if (!UAData) {
      Send(Text(`未加入${name}`))
      return
    }

    Send(Text('待更新...'))

    // 查看仓库
    return
  },
  'message.create',
  /^(#|\/)?打开([\u4e00-\u9fa5]+)宝库$/
)
