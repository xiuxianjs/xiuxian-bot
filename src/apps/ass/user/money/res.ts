import { getIoRedis, Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { isUser } from '@xiuxian/api/index'
import { ass, user_ass } from '@xiuxian/db/index'
import { Bag, operationLock } from '@src/xiuxian/core'
import moment from 'moment'
import { literal } from 'sequelize'

// 查看该宗门都有谁
export default OnResponse(
  async e => {
    const T = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    const UID = await getEmailUID(e.UserId)

    const UserData = await isUser(e, UID)

    if (typeof UserData === 'boolean') return

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
      moment.unix(Math.floor(Number(value) / 1000)).isSame(moment(), 'day')
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
  },
  'message.create',
  /^(#|\/)?领取俸禄$/
)
