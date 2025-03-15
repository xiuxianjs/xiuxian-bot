import { Text, useSend } from 'alemonjs'

import * as DB from '@xiuxian/db/index'
// 查看该宗门都有谁
import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)打开([\u4e00-\u9fa5]+)宝库$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UID = e.UserKey
    const text = e.MessageText
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

    // 查看我的资料，确保有权限
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
  }
])
