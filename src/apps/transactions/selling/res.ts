import { Image, Text, useSend } from 'alemonjs'

import { operationLock } from '@xiuxian/core/index'
import { Attributes, user, user_transactions } from '@xiuxian/db/index'
import { pictureRender } from '@xiuxian/img/index'
import Xiuxian from '@src/apps/index'
export const regular = /^(#|\/)我的虚空镜$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)我的虚空镜$/.test(e.MessageText)) {
        next()
        return
      }
      const T = await operationLock(e.UserKey)
      const Send = useSend(e)
      if (!T) {
        Send(Text('操作频繁'))
        return
      }
      //
      const UID = e.UserKey
      const UserData = e['UserData'] as Attributes<typeof user>
      user_transactions
        .findAll({
          where: {
            uid: UID
          }
        })
        .then(res => res.map(item => item?.dataValues))
        .then(async res => {
          if (res.length === 0) {
            Send(Text('没有找到数据'))
            return
          }

          // 返回物品信息
          const img = await pictureRender('TransactionMessage', {
            data: {
              page: 1,
              goods: res
            },
            theme: UserData.theme
          })

          //
          if (Buffer.isBuffer(img)) {
            Send(Image(img))
          } else {
            Send(Text('截图错误'))
          }
        })
        .catch(err => {
          console.error(err)
          Send(Text('数据错误'))
        })
    }
  ],
  ['message.create', 'private.message.create']
)
