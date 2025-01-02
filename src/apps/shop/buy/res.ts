import { controlByName } from '@xiuxian/api/index'
import { Method } from '@xiuxian/core/index'
import * as DB from '@xiuxian/db/index'
import * as GameApi from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'

import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)(购买|購買)[\u4e00-\u9fa5]+\*\d+$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)(购买|購買)[\u4e00-\u9fa5]+\*\d+$/.test(e.MessageText)) {
        next()
        return
      }
      // lock start
      const T = await GameApi.operationLock(e.UserKey)
      const Send = useSend(e)
      if (!T) {
        Send(Text('操作频繁'))
        return
      }
      // 获取用户信息
      const UID = e.UserKey
      const UserData = e['UserData'] as DB.Attributes<typeof DB.user>
      if (!(await controlByName(e, UserData, '万宝楼'))) return
      // 解析消息
      const text = e.MessageText
      const [thingName, quantity] = text
        .replace(/^(#|\/)(购买|購買)/, '')
        .split('*')

      //
      const ifexist = await DB.goods_commodities
        .findOne({
          include: [
            {
              model: DB.goods,
              where: {
                name: thingName // 找到物品名
              }
            }
          ]
        })
        .then(item => item?.dataValues['good']['dataValues'])

      //
      if (!ifexist) {
        Send(Text(`[万宝楼]小二:\n没有[${thingName}]`))
        return
      }
      const lingshi = await GameApi.Bag.searchBagByName(UID, '下品灵石')
      const count = Math.floor(Number(quantity))

      const price = Math.floor(
        ifexist.price * count * GameApi.Cooling.ExchangeStart
      )
      if (!lingshi || lingshi.acount < price) {
        Send(Text(`[万宝楼]小二:\n你似乎没有${price}*[下品灵石]`))

        return
      }
      // 检查背包
      const BagSize = await GameApi.Bag.backpackFull(UID)
      if (!BagSize) {
        Send(Text('储物袋空间不足'))

        return
      }

      // 查看自己可买多少
      const bData = await DB.user_buy_log
        .findOne({
          where: {
            uid: UID
          }
        })
        .then(res => res?.dataValues)
      const now = new Date()

      // 听说每天购买有bug
      // tudo
      if (count > ifexist.limit_buy) {
        Send(Text(`[万宝楼]小二:\n每天可买${ifexist.limit_buy}`))
        return
      }

      if (bData) {
        // 存在  判断日期
        if (
          Method.isSameDay(bData.buy_time, now) &&
          bData.count > ifexist.limit_buy
        ) {
          Send(
            Text(`[万宝楼]小二:\n每天可买${ifexist.limit_buy - bData.count}`)
          )
          return
        } else {
          // 更新数据
          await DB.user_buy_log.update(
            {
              count: bData.count + count,
              buy_time: now,
              createAt: now
            },
            {
              where: {
                uid: UID,
                name: thingName
              }
            }
          )
        }
      } else {
        // 不存在，创建即可
        await DB.user_buy_log.create({
          uid: UID,
          name: thingName,
          count: count,
          buy_time: now,
          createAt: now
        })
      }

      await GameApi.Bag.reduceBagThing(UID, [
        {
          name: '下品灵石',
          acount: price
        }
      ])

      await GameApi.Bag.addBagThing(UID, [
        {
          name: ifexist.name,
          acount: count
        }
      ])

      Send(Text(`[万宝楼]薛仁贵\n你花${price}购买了${thingName}*${count}`))

      return
    }
  ],
  ['message.create', 'private.message.create']
)
