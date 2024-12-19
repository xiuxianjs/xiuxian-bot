import * as DB from '@xiuxian/db/index'
import { skys, user_sky_reward } from '@xiuxian/db/index'
import { Op } from 'sequelize'
import { Bag, operationLock } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(async (e, next) => {
  if (!/^(#|\/)领取通天塔奖励$/.test(e.MessageText)) {
    next()
    return
  }
  // 操作锁
  const TT = await operationLock(e.UserKey)
  const Send = useSend(e)
  if (!TT) {
    Send(Text('操作频繁'))
    return
  }

  const UID = await getEmailUID(e.UserKey)

  // 查看数据是否存在
  const data = await DB.user_sky_ranking
    .findOne({
      where: {
        uid: UID
      }
    })
    .then(res => res?.dataValues)
  if (!data) {
    Send(Text('未进入'))

    return
  }
  if (data.id > 50) {
    Send(Text('最低奖励需排名50'))
    return
  }
  // 国际时间
  const currentDate = new Date()
  currentDate.setDate(1)
  currentDate.setHours(0, 0, 0, 0)
  // 北京时间
  // const currentDate = new Date()
  // currentDate.setDate(1)
  // currentDate.setHours(8, 0, 0, 0)
  const uDAta = await user_sky_reward
    .findAll({
      where: {
        uid: UID,
        time: currentDate
      }
    })
    .then(res => res.map(item => item?.dataValues))

  // 领取记录
  const ids = uDAta.map(item => item.sid)
  // 找到 比 比排名少的数据。 并一次检查记录中，是否存在领取记录。
  const sData = await skys
    .findAll({
      where: {
        ranking: {
          [Op.gte]: data.id
        }
      }
    })
    .then(res => res.map(item => item?.dataValues))
  const sData2 = sData.filter(item => {
    // 存在
    if (ids.includes(item.id)) {
      return false
    } else {
      return true
    }
  })
  const goods = sData2.map(item => ({
    id: item.id,
    name: item.name,
    acount: item.count
  }))

  const BagSize = await Bag.backpackFull(UID)
  // 背包未位置了直接返回了
  if (!BagSize) {
    Send(Text('储物袋空间不足'))

    return
  }
  const msg = ['领取物品']
  for (const item of goods) {
    await user_sky_reward.create({
      uid: UID,
      // 对应奖励条
      time: currentDate,
      sid: item.id,
      createAt: new Date()
    })
    msg.push(`[${item.name}]*${item.acount}`)
  }
  await Bag.addBagThing(UID, goods)
  if (msg.length <= 1) {
    Send(Text('此排名奖励本月已无法领取'))
  } else {
    Send(Text(msg.join('\n')))
  }
}, 'message.create')
