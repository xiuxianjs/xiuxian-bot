import { pictureRender } from '@xiuxian/img/index'
import { ass, ass_typing, user_ass } from '@xiuxian/db/index'
import { Image, Text, useSend } from 'alemonjs'

import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)我的势力$/.test(e.MessageText)) {
      next()
      return
    }
    const UID = e.UserKey

    // send
    const Send = useSend(e)

    // 查看自己的我的势力
    user_ass
      .findAll({
        where: {
          uid: UID
        },
        include: [
          {
            model: ass,
            include: [
              {
                model: ass_typing
              }
            ]
          }
        ]
      })
      .then(res => res.map(item => item?.dataValues))
      .then(async res => {
        if (res.length === 0) {
          Send(Text('未加入任何势力'))
          return
        }
        // 返回物品信息
        const img = await pictureRender('AssMessage', {
          data: res,
          theme: 'dark'
        })
        //
        if (Buffer.isBuffer(img)) {
          Send(Image(img))
        } else {
          Send(Text('截图错误'))
        }
      })

    //
    return
  },
  ['message.create', 'private.message.create']
)
