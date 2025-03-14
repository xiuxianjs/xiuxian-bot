import { ass, user_ass } from '@src/xiuxian/db'
import { Text, useSend } from 'alemonjs'

import { operationLock } from '@src/xiuxian/core'
import Xiuxian from '@src/apps/index'

export const regular = /^(#|\/)逐出/
export default OnResponse(
  [
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

      // 输入的是标记

      const id = text.replace(/^(#|\/)逐出/, '')
      if (!id) return

      const ID = Number(id)

      if (isNaN(ID)) {
        Send(Text('错误标记..'))
        return
      }

      const idData = await user_ass
        .findOne({
          where: {
            id: ID
          },
          include: [
            {
              model: ass
            }
          ]
        })
        .then(res => res?.dataValues)

      if (!idData) {
        Send(Text('无效标记..'))
        return
      }

      const aData = idData['ass']['dataValues']

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
      if (!UserAss) {
        Send(Text('不属于该宗门'))
        return
      }

      if (idData.id == UserAss.id) {
        Send(Text('无法对自己进行操作'))
        return
      }

      // 大于4
      if (UserAss.authentication >= 4) {
        Send(Text('权能不足'))
        return
      }

      // 权能对比
      if (idData.authentication <= UserAss.authentication) {
        Send(Text('你的权能无法对他进行逐出'))
        return
      }

      await user_ass.destroy({
        where: {
          id: idData.id
        }
      })

      Send(Text('已逐出'))

      return
    }
  ],
  ['message.create', 'private.message.create']
)
