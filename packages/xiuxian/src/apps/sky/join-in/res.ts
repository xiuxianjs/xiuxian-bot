import { Text, useSend } from 'alemonjs'

import * as DB from '@xiuxian/db/index'

import Xiuxian, { selects } from '@src/apps/index'

import { operationLock } from '@src/xiuxian/core'

export const regular = /^(#|\/)?进入通天塔$/
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

    //查看数据是否存在
    const data = await DB.user_sky_ranking
      .findOne({
        where: {
          uid: UID
        }
      })
      .then(res => res?.dataValues)

    if (data) {
      Send(Text('已进入'))

      return
    }

    Send(Text('进入通天塔'))

    await DB.user_sky_ranking.create({
      uid: UID
    })
  }
])
