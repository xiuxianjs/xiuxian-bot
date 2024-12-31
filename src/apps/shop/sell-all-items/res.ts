import { controlByName } from '@xiuxian/api/index'
import * as DB from '@xiuxian/db/index'
import * as GameApi from '@xiuxian/core/index'

import { Text, useSend } from 'alemonjs'

import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)售出所有物品$/.test(e.MessageText)) {
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
    const UID = e.UserKey

    const UserData = e['UserData'] as DB.Attributes<typeof DB.user>

    if (!(await controlByName(e, UserData, '万宝楼'))) return
    // 累计
    let money = 0
    // 得到该物品的所有信息
    const bag = await DB.user_bag
      .findAll({
        where: {
          uid: UID
        },
        include: {
          model: DB.goods
        }
      })
      .then(res => res.map(item => item?.dataValues))
    // 计算金额
    for await (const item of bag) {
      money += item.acount * item['good']['dataValues']['price']
    }

    // 计算所得
    money = Math.floor(money * GameApi.Cooling.ExchangeEnd)

    // 出现错误
    if (isNaN(money) || money == 0) {
      Send(Text('没有物品'))

      return
    }

    // 删除所有
    await DB.user_bag.destroy({
      where: {
        uid: UID
      }
    })

    // 获得
    await GameApi.Bag.addBagThing(UID, [
      {
        name: '下品灵石',
        acount: money
      }
    ])

    Send(Text(`[万宝楼]欧阳峰:\n出售得${money}*[下品灵石]`))

    return
  },
  ['message.create', 'private.message.create']
)
