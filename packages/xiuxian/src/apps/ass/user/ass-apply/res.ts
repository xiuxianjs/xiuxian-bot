import { ass, user_ass_apply } from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
import { Text, useSend } from 'alemonjs'
export const regular = /^(#|\/)我的势力申请$/
export default onResponse(selects, [
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
])
