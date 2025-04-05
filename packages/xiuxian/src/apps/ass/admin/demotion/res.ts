import { Config, operationLock } from '@src/xiuxian/core'
import { ass, user_ass } from '@src/xiuxian/db'
import { Text, useSend } from 'alemonjs'
import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^(#|\/)?贬职/
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

    // 输入的是标记

    const id = text.replace(/^(#|\/)?贬职/, '')
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
    const UserAss = await user_ass.findOneValue({
      where: {
        uid: UID, // uid
        aid: aData.id
      }
    })

    // 不存在
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
      Send(Text('你的权能无法对他进行贬职'))
      return
    }

    //
    const authentication = idData.authentication + 1

    // 已经是最低权能
    if (authentication > 8) {
      Send(Text('已无法再贬职'))
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

    Send(Text('已贬职'))

    return
  }
])
