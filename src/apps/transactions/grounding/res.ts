import { Text, useSend } from 'alemonjs'

import { Bag, Cooling, operationLock } from '@xiuxian/core/index'
import { goods, user_transactions, user_bag } from '@xiuxian/db/index'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)上架/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)上架/.test(e.MessageText)) {
        next()
        return
      }
      const T = await operationLock(e.UserKey)
      const Send = useSend(e)
      if (!T) {
        Send(Text('操作频繁'))
        return
      }
      const UID = e.UserKey
      // 解析文本
      const text = e.MessageText
      //  /上架物品名*数量*价格
      const [name, countx, pricex] = text
        .replace(/^(#|\/)上架/, '')
        .trim()
        .split('*')
      const count = Math.floor(isNaN(Number(countx)) ? 1 : Number(countx))
      const price = Math.floor(isNaN(Number(pricex)) ? 1 : Number(pricex))
      // 查询物品
      const data = await user_transactions
        .findOne({
          where: {
            uid: UID
          }
        })
        .then(res => res?.dataValues)

      if (data) {
        Send(Text('已有上架物品'))
        return
      }

      const gData = await goods
        .findOne({
          where: {
            name: name
          }
        })
        .then(res => res?.dataValues)

      //
      if (!gData) {
        Send(Text('出错物品，请联系管理员'))
        return
      }

      if (price > gData.price * Cooling.MAX_PRICE_P * count) {
        Send(Text('你在尝试违规定价,操作已取消'))
        return
      }

      // 查询 物品
      const thing = await user_bag
        .findOne({
          where: {
            uid: UID,
            name: name
          }
        })
        .then(res => res?.dataValues)

      if (!thing) {
        Send(Text('物品不存在'))
        return
      }

      if (thing.acount < count) {
        Send(Text(`[${thing.name}]*${thing.acount}物品不足`))
        return
      }

      //
      const createAt = new Date()

      // count 超出了范围。
      // 也就是 count 不能超过 9999

      await user_transactions
        .create({
          uid: UID,
          name: name,
          count: count > 999999 ? 999999 : count,
          price: price,
          createAt: createAt
        })
        .then(async () => {
          // 减少物品
          await Bag.reduceBagThing(UID, [
            {
              name: thing.name,
              acount: count
            }
          ])
          Send(Text('上架成功'))
        })
        .catch(err => {
          console.error(err)
          // 确保物品被删除
          user_transactions.destroy({
            where: {
              uid: UID,
              name: name,
              createAt: createAt
            }
          })
          Send(Text('上架失败'))
        })
    }
  ],
  ['message.create', 'private.message.create']
)
