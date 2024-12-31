import { Text, useSend } from 'alemonjs'

import { Bag, operationLock } from '@xiuxian/core/index'
import { Redis } from '@xiuxian/db/index'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)领取交易所得$/.test(e.MessageText)) {
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
  },
  ['message.create', 'private.message.create']
)
