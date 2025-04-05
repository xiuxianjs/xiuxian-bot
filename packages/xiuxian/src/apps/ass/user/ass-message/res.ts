import { ass, ass_typing, user_ass } from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
import { Image, Text, useSend } from 'alemonjs'
import { renderComponentToBuffer } from 'jsxp'
import AssMessage from '@src/xiuxian/img/src/views/AssMessage'
export const regular = /^(#|\/)?我的势力$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
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
        const img = await renderComponentToBuffer('AssMessage', AssMessage, {
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
  }
])
