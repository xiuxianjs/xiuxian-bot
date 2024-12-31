import { Config, operationLock } from '@src/xiuxian/core'
import { ass, user_ass } from '@src/xiuxian/db'
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
    if (!/^(#|\/)提拔/.test(e.MessageText)) {
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

    // 输入的是标记

    const id = text.replace(/^(#|\/)提拔/, '')
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
      Send(Text('你的权能无法对他进行提拔'))
      return
    }

    //
    const authentication = idData.authentication - 1
    if (authentication <= 0) {
      Send(Text('已无法再提拔'))
      return
    }

    await user_ass.update(
      {
        authentication,
        identity: Config.ASS_IDENTITY_MAP[authentication]
      },
      {
        where: {
          id: idData.id
        }
      }
    )

    Send(Text('提拔成功'))

    return
  },
  ['message.create', 'private.message.create']
)
