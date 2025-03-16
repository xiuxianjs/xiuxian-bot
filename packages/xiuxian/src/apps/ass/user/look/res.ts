import { Text, useSend } from 'alemonjs'
import * as DB from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
// 查看该宗门都有谁
export const regular = /^(#|\/)我的势力[\u4e00-\u9fa5]+$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const text = e.MessageText
    const name = text.replace(/^(#|\/)我的势力/, '')

    // 查看该宗门中。关于自己的信息和宗门的信息。

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
      .catch(err => console.error(err))

    if (!UADatas) {
      Send(Text('势力数据异常'))
      return
    }

    const msg = [
      `🏹[${AData['name']}]-${AData['grade']}`,
      `灵池:${AData[`property`]}`,
      `活跃:${AData['activation']}`,
      `名望:${AData['fame']}`
    ]

    UADatas.forEach(item => {
      const usermsg = item['user']['dataValues']
      const assmsg = item['ass']['dataValues']
      const asstypingmsg = assmsg['ass_typing']['dataValues']
      msg.push(
        `标记:${item.id},道号:${usermsg.name},\n身份:${asstypingmsg[item.identity]},权限:${item.authentication},贡献:${item.contribute}。`
      )
    })

    Send(Text(msg.join('\n')))

    return
  }
])
