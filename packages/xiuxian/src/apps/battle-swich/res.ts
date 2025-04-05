import { Text, useMention, useSend } from 'alemonjs'
import {
  sendReply,
  dualVerification,
  isSideUser,
  victoryCooling
} from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
import { operationLock } from '@xiuxian/core/index'
import * as DB from '@xiuxian/db/index'
import Xiuxian, { selects, useCurrent } from '@src/apps/index'
import { isUIDInAddress } from '@src/xiuxian/core/src/system/address'
export const regular = /^(#|\/)?打劫/

const response = onResponse(selects, async e => {
  const Send = useSend(e)
  if (e.name !== 'message.create') {
    Send(Text('请在群聊中使用'))
    return
  }
  // lock
  const T = await operationLock(e.UserKey)
  if (!T) {
    Send(Text('操作频繁'))
    return
  }
  const UID = e.UserKey
  const UserData = useCurrent(e).UserData
  const [mention] = useMention(e)
  const res = await mention.findOne()
  let UIDB: string | null = null
  if (res.code !== 2000) {
    // 不是@机制。则直接正则截取到uid
    const uid = e.MessageText.replace(regular, '').trim()
    if (!(await isUIDInAddress(e.ChannelId, uid))) {
      Send(Text('道友不在此处'))
    }
    UIDB = uid
    return
  } else {
    UIDB = res.data
  }
  if (!UIDB || UIDB == '') {
    Send(Text('请@道友'))
    return
  }
  const UserDataB = await isSideUser(e, UIDB)
  if (!UserDataB || typeof UserDataB === 'boolean') {
    Send(Text('此乃凡人'))
    return
  }
  if (!(await dualVerification(e, UserData, UserDataB))) {
    // 判断是否可为
    return
  }
  const CDID = 24
  const CDTime = GameApi.Cooling.CD_Battle
  if (!(await victoryCooling(e, UID, CDID))) {
    // my cd...
    return
  }
  const create_time = Date.now()

  /**
   * 判断灵力
   */
  const levelsB = await DB.user_level.findOneValue({
    where: {
      uid: UID,
      type: 1
    }
  })

  if (UserData.special_spiritual < levelsB.realm) {
    Send(Text(`${UserData.immortal_grade > 0 ? '仙力' : '灵力'}不足`))
    return
  }

  GameApi.Burial.set(UID, CDID, CDTime)

  /**
   * 对方非百煞
   */
  if (UserDataB.special_prestige < 100) {
    // 加煞气
    UserData.special_prestige += 1
  }

  const BMSG = GameApi.Fight.start(UserData, UserDataB)

  await DB.user.update(
    {
      special_prestige: UserData.special_prestige,
      special_spiritual:
        UserData.special_spiritual - Math.floor(levelsB.realm / 2),
      battle_blood_now: BMSG.battle_blood_now.a
    },
    {
      where: {
        uid: UID
      }
    }
  )

  await DB.user.update(
    {
      battle_blood_now: BMSG.battle_blood_now.b
    },
    {
      where: {
        uid: UIDB
      }
    }
  )

  Send(
    Text(
      [
        `你的🩸${BMSG.battle_blood_now.a}\n`,
        `对方🩸${BMSG.battle_blood_now.b}`
      ].join('')
    )
  )

  // 是否显示战斗结果
  if (UserData.battle_show || UserDataB.battle_show) {
    // 切割战斗信息
    sendReply(Send, '[战斗结果]', BMSG.msg)
  }

  /**
   * 平局了,保存双方存档即可
   */
  if (BMSG.victory == '0') {
    DB.user_log.create({
      uid: UIDB,
      type: 2,
      create_time,
      message: `${UserData.name}攻击了你,你跟他打成了平手~`
    })
    Send(Text('你与对方打成了平手'))
    return
  }

  const NameMap = {}

  NameMap[UID] = UserData.name

  NameMap[UIDB] = UserDataB.name

  const user = {
    PartyA: UID, // 默认自己赢了
    PartyB: UIDB,
    prestige: UserDataB.special_prestige
  }

  if (BMSG.victory == UIDB) {
    /** 结果是对方赢了 */
    user.PartyA = UIDB
    user.PartyB = UID
    user.prestige = UserData.special_prestige
  }

  if (!GameApi.Method.isTrueInRange(1, 100, Math.floor(user.prestige))) {
    DB.user_log.create({
      uid: UIDB,
      type: 2,
      create_time,
      message: `[${UserData.name}]攻击了你,你重伤在地`
    })

    Send(Text('未抢到的物品'))

    return
  }

  // 随机删除败者储物袋的物品
  const data = await GameApi.Bag.delThing(user.PartyB)

  if (!data) {
    DB.user_log.create({
      uid: UIDB,
      type: 2,
      create_time,
      message: `[${UserData.name}]攻击了你,你重伤在地`
    })

    Send(Text('穷的都吃不起灵石了'))

    return
  }

  const goods = data[0]

  if (user.PartyA == UID) {
    DB.user_log.create({
      uid: UID,
      type: 2,
      create_time,
      message: `[${UserData.name}]夺走了你的[${goods.name}]*${goods.acount}~`
    })
  } else {
    DB.user_log.create({
      uid: UID,
      type: 2,
      create_time,
      message: `你夺走了[${UserData.name}]的[${goods.name}]*${goods.acount}~`
    })
  }

  const BagSize = await GameApi.Bag.backpackFull(user.PartyA)
  if (!BagSize) {
    Send(Text('储物袋空间不足'))

    return
  }

  Send(
    Text(
      [
        NameMap[user.PartyA],
        '夺走了',
        NameMap[user.PartyB],
        `的[${goods.name}]*${goods.acount}~`
      ].join('')
    )
  )

  // 交互物品
  await GameApi.Bag.addBagThing(user.PartyA, [
    {
      name: goods.name,
      acount: goods.acount
    }
  ])

  return
})

export default onResponse(selects, [Xiuxian.current, response.current])
