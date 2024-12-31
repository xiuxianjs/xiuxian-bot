import { Text, useSend } from 'alemonjs'

import * as GameApi from '@xiuxian/core/index'
import * as DB from '@xiuxian/db/index'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)退出势力[\u4e00-\u9fa5]+$/.test(e.MessageText)) {
      next()
      return
    }
    // 操作锁
    const TT = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey
    //
    const text = e.MessageText

    // 势力名称
    const name = text.replace(/^(#|\/)退出势力/, '')

    // 存在该昵称的宗门
    const aData = await DB.ass
      .findOne({
        where: {
          name: name
        }
      })
      .then(res => res?.dataValues)

    //
    if (!aData) {
      Send(Text('该势力不存在'))
      return
    }

    // 查看是否是主人
    const UserAss = await DB.user_ass
      .findOne({
        where: {
          uid: UID,
          aid: aData.id,
          identity: GameApi.Config.ASS_IDENTITY_MAP['0']
        }
      })
      .then(res => res?.dataValues)
      .catch(err => console.error(err))

    //
    if (UserAss) {
      Send(Text('个人势力不可退出'))
      return
    }

    // 从个人数据中，删除自己的数据
    await DB.user_ass.destroy({
      where: {
        uid: UID,
        aid: aData.id
      }
    })

    Send(Text(`已退出${name}`))

    //
  },
  ['message.create', 'private.message.create']
)
