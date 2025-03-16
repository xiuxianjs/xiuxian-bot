import { Text, useSend } from 'alemonjs'
import { getIoRedis } from '@alemonjs/db'
import { ass, user_ass } from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
import { Bag, operationLock } from '@src/xiuxian/core'
import dayjs from 'dayjs'
import { literal } from 'sequelize'
export const regular = /^(#|\/)领取势力俸禄$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // 操作锁
    const TT = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey

    const AData = await user_ass
      .findAll({
        where: {
          uid: UID
        }
      })
      .then(res => res.map(res => res?.dataValues))

    if (!AData) {
      Send(Text('未加入任何势力'))
      return
    }

    const ioRedis = getIoRedis()

    const KEY = `xiuxian:ass:money:${UID}`

    const value = await ioRedis.get(KEY)

    if (
      value &&
      dayjs.unix(Math.floor(Number(value) / 1000)).isSame(dayjs(), 'day')
    ) {
      Send(Text('今日已领取'))
      return
    }

    const acount = AData.reduce(
      (total, item) => total + (10 - item.authentication),
      0
    )

    const good = [
      {
        name: '极品灵石',
        acount: acount
      }
    ]

    // 增加灵石
    Bag.addBagThing(UID, good)

    await ioRedis.set(KEY, Date.now())

    Send(Text(good.map(item => `${item.name}+${item.acount}`).join('\n')))

    //
    AData.forEach(item => {
      ass.update(
        {
          property: literal(`property - ${(10 - item.authentication) * 1000}`)
        },
        {
          where: {
            id: item.aid
          }
        }
      )
    })

    //
  }
])
