import { Image, Text, useSend } from 'alemonjs'
import { operationLock } from '@xiuxian/core/index'
import { Attributes, user, user_transactions } from '@xiuxian/db/index'
import { pictureRender } from '@xiuxian/img/index'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)虚空镜/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)虚空镜/.test(e.MessageText)) {
        next()
        return
      }
      // lock
      const T = await operationLock(e.UserKey)
      const Send = useSend(e)
      if (!T) {
        Send(Text('操作频繁'))
        return
      }
      // is user
      const UserData = e['UserData'] as Attributes<typeof user>
      // message parse
      const text = e.MessageText
      const [xpage = '1', name] = text
        .replace(/^(#|\/)虚空镜/, '')
        .trim()
        .split('*')

      const where: {
        name?: string
      } = {}

      if (name !== undefined) {
        where.name = name
      }

      // 添加分页参数
      const page = parseInt(xpage) || 1 // 当前页数，默认为1
      const pageSize = 10 // 每页数据数量，默认为10
      const offset = (page - 1) * pageSize // 计算偏移量

      //
      user_transactions
        .findAll({
          where: where,
          limit: pageSize,
          offset: offset
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
              page: page,
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
