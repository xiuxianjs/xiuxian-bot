import { Text, useSend } from 'alemonjs'
import { Bag, operationLock, order } from '@xiuxian/core/index'
import { Redis, user_transactions, user_bag } from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^(#|\/)?选购/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // 锁定
    const T = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    //
    const UID = e.UserKey
    // 解析文本
    const text = e.MessageText
    const id = text.replace(/^(#|\/)?选购/, '').trim()
    if (!id || id == '' || isNaN(Number(id))) {
      Send(Text('请输入正确的编号'))
      return
    }

    // 查询物品
    const data = await user_transactions.findOneValue({
      where: {
        id: Number(id)
      }
    })

    if (!data) {
      Send(Text('没有找到该物品'))
      return
    }

    if (data.uid == UID) {
      Send(Text('不能购买自己的物品'))
      return
    }

    // 查询下品灵石
    const money = await user_bag.findOneValue({
      where: {
        uid: UID,
        name: '下品灵石'
      }
    })

    //
    if (!money) {
      Send(Text('没有找到下品灵石'))
      return
    }

    const Value = Math.floor(data.price * 0.1)
    const needMoeny = data.price + Value
    const getMoeny = data.price - Value

    if (data.price > money.acount) {
      Send(Text(`下品灵石不足${needMoeny}(+${Value})`))
      return
    }

    const BagSize = await Bag.backpackFull(UID)
    // 背包未位置了直接返回了
    if (!BagSize) {
      Send(Text('储物袋空间不足'))
      return
    }

    // 交易
    const Del = await order.delThing(data.id)

    if (!Del) {
      Send(Text('交易失败'))
      return
    }

    // 扣钱
    await Bag.reduceBagThing(UID, [
      {
        name: '下品灵石',
        acount: needMoeny
      }
    ])

    // 加物品
    await Bag.addBagThing(UID, [
      {
        name: data.name,
        acount: data.count
      }
    ])

    // 存入
    const KEY = `xiuxian:money:${data.uid}`
    await Redis.set(KEY, `下品灵石*${getMoeny}`)

    Send(Text('购买成功'))

    return
  }
])
