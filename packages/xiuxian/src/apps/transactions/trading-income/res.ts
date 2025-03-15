import { Text, useSend } from 'alemonjs'

import { Bag, operationLock } from '@xiuxian/core/index'
import { Redis } from '@xiuxian/db/index'
import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)领取交易所得$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const T = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    const UID = e.UserKey
    // 存入临时数据
    const KEY = `xiuxian:money:${UID}`
    const log = await Redis.get(KEY)
    if (!log) {
      Send(Text('无所得'))
      return
    }
    const BagSize = await Bag.backpackFull(UID)
    // 背包未位置了直接返回了
    if (!BagSize) {
      Send(Text('储物袋空间不足'))
      return
    }
    const [name, count] = log.split('*')
    await Redis.del(KEY)
    // 加物品
    await Bag.addBagThing(UID, [
      {
        name: name,
        acount: Number(count)
      }
    ])
    Send(Text(`获得[${name}]*${count}`))
  }
])
