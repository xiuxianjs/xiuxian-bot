import { ass, user_ass_apply } from '@xiuxian/db/index'
import { Text, useSend } from 'alemonjs'

import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)我的势力申请$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const UID = e.UserKey
      // send
      const Send = useSend(e)
      // 查看自己的我的势力
      user_ass_apply
        .findAll({
          where: {
            uid: UID
          },
          include: [
            {
              model: ass
            }
          ]
        })
        .then(res => res.map(item => item?.dataValues['ass']['dataValues']))
        .then(async res => {
          if (res.length === 0) {
            Send(Text('未有任何申请'))
            return
          }
          Send(Text(res.map(item => `势力:${item.name}(待加入)`).join('\n')))
        })
      return
    }
  ],
  ['message.create', 'private.message.create']
)
