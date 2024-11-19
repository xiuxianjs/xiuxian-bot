import { ass, user_ass_apply } from '@xiuxian/db/index'
import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)
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
  },
  'message.create',
  /^(#|\/)?我的势力申请$/
)
