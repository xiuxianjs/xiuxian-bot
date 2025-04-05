import { Attributes, user, user_level } from '@xiuxian/db/index'
import {
  Cooling,
  Method,
  // Map,
  Burial,
  // Treasure,
  State,
  Levels,
  Bag,
  Equipment
} from '@xiuxian/core/index'
import { urlHelpCache } from '@xiuxian/utils/index'
import { personalInformation } from '@xiuxian/statistics/index'
import { EventsMessageCreateEnum, Image, Text, useSend } from 'alemonjs'
import { renderComponentToBuffer } from 'jsxp'
import XMessage from '../img/src/views/XMessage'
export type UserDataType = Attributes<typeof user>
/**
 * 显示我的资料
 * @param e
 * @param avatar
 */
export async function showUserMsg(e: EventsMessageCreateEnum) {
  const UID = e.UserKey
  const Send = useSend(e)
  const avatar = await e.UserAvatar.toURL()
  const img = await personalInformation(UID).then(async UserData =>
    renderComponentToBuffer('MessageComponent/' + UserData.UID, XMessage, {
      data: UserData,
      theme: UserData?.theme ?? 'dark',
      avatar: avatar
    })
  )
  if (typeof img != 'boolean') {
    Send(Image(img))
  } else {
    Send(Text('数据错误'))
  }
  return
}

/**
 * 玩家交互状态判断
 * @param e
 * @param UID
 * @param UIDB
 * @returns
 */
export async function dualVerification(
  e: EventsMessageCreateEnum,
  UserData: UserDataType,
  UserDataB: UserDataType
) {
  const Send = useSend(e)
  if (UserData.uid == UserDataB.uid) {
    Send(Text('自己打自己?'))
    return false
  }
  const { state: stateA, msg: msgA } = await State.goByBlood(UserData)
  if (stateA == 4001) {
    Send(Text(msgA))
    return false
  }
  const { state: stateB, msg: msgB } = await State.goByBlood(UserDataB)
  if (stateB == 4001) {
    Send(Text(msgB))
    return false
  }
  return true
}

/**
 * 玩家交互地点判断
 * @param e
 * @param region
 * @param regionB
 * @returns
 */
export function dualVerificationAction(
  e: EventsMessageCreateEnum,
  region: number,
  regionB: number
) {
  if (region != regionB) {
    const Send = useSend(e)
    Send(Text('此地未找到此人'))
    return false
  }
  return true
}

/**
 * 图片消息分发
 * @param e
 * @param msg
 * @returns
 */
export async function sendReply(
  Send,
  title: string,
  msg: string[] = [],
  size = 8
) {
  // 按每7条消息分组并发送
  for (let i = 0; i < msg.length; i += size) {
    const slicedMsg = msg.slice(i, i + size)
    slicedMsg.unshift(title)
    // 间隔500毫秒发送一组消息
    setTimeout(() => {
      Send(Text(slicedMsg.join('\n')))
    }, i * 300)
  }
  return
}

/**
 * 无限制控制器
 * @param e
 * @param UID
 * @returns
 */
export async function Control(
  e: EventsMessageCreateEnum,
  UserData: UserDataType
) {
  const { state, msg } = await State.Go(UserData)
  const Send = useSend(e)
  if (state == 4001) {
    Send(Text(msg))
    return false
  }
  return true
}

/**
 * 血量控制器
 * @param e
 * @param UID
 * @returns
 */
export async function ControlByBlood(
  e: EventsMessageCreateEnum,
  UserData: UserDataType
) {
  const { state, msg } = await State.goByBlood(UserData)
  const Send = useSend(e)
  if (state == 4001) {
    Send(Text(msg))
    return false
  }
  return true
}

/**
 * 地点名控制器
 * @param e
 * @param UID
 * @param addressName
 * @returns
 */
export async function controlByName(
  e: EventsMessageCreateEnum,
  UserData: UserDataType
  // addressName: string
) {
  if (!(await ControlByBlood(e, UserData))) return false
  // if (
  //   !(await Map.mapExistence(
  //     UserData.pont_x,
  //     UserData.pont_y,
  //     UserData.point_z,
  //     addressName
  //   ))
  // ) {
  //   const Send = useSend(e)
  //   Send(Text(`你没有在这里哦！\n————————\n[/前往${addressName}]`))
  //   return false
  // }
  return true
}

/**
 * 帮助图发送
 * @param e
 * @param name
 * @returns
 */
export async function postHelp(e: EventsMessageCreateEnum, name: string) {
  const img = await urlHelpCache(name).catch(err => {
    console.error(err)
    return '图片缓存错误'
  })
  const Send = useSend(e)
  if (typeof img === 'string') {
    //
  } else {
    Send(Image(img))
  }
  return false
}

const npcName = [
  '巡逻军',
  '城主',
  '柠檬冲水',
  '百里寻晴',
  '联盟',
  '修仙联盟',
  '联盟商会',
  '玄玉天宫',
  '玉贞子',
  '玉炎子',
  '天机门',
  '东方无极'
]

/**
 * 击杀npc
 * @param e
 * @param Mname
 * @param UID
 * @param battle
 * @param BagData
 * @param SpecialData
 * @returns
 */
export async function killNPC(
  e: EventsMessageCreateEnum,
  Mname: string,
  UID: string,
  prestige: number
) {
  if (!npcName.find(item => Mname.includes(item))) return true

  const Send = useSend(e)

  Send(Text(`[${Mname}]:狂妄!`))

  await user.update(
    {
      battle_blood_now: 0
    },
    {
      where: {
        uid: UID
      }
    }
  )

  Send(Text(`你被[${Mname}]重伤倒地!`))

  // 不触发
  if (!Method.isTrueInRange(1, 100, Math.floor(prestige + 10))) {
    return false
  }

  // 随机去掉一个物品
  const data = await Bag.delThing(UID)

  // 存在物品
  if (data[0]) {
    // 击碎标记
    // await Treasure.add(data[0].name, data[0].type, data[0].acount)
    Send(Text(`[${Mname}]击碎了你的的[${data[0].name}]`))
  }

  //
  return false
}

// export async function showAction(
//   e: EventsMessageCreateEnum,
//   UID: string,
//   UserData: UserDataType
// ) {
//   const mData = await Map.getRecordsByXYZ(
//     UserData.pont_x,
//     UserData.pont_y,
//     UserData.pont_z
//   )
//   if (mData) {
//     await user.update(
//       {
//         point_type: mData.type,
//         pont_attribute: mData.attribute,
//         pont_x: UserData.pont_x,
//         pont_y: UserData.pont_y,
//         pont_z: UserData.pont_z
//       },
//       {
//         where: {
//           uid: UID
//         }
//       }
//     )
//     const Send = useSend(e)
//     Send(Text(`(${UserData.pont_x},${UserData.pont_y},${UserData.pont_z})`))
//   }
//   return
// }

/**
 * 对方是否存在
 * @param UID
 * @returns
 */
export async function isSideUser(e: EventsMessageCreateEnum, UID: string) {
  const UserData = await user.findOneValue({
    where: {
      uid: UID
    }
  })
  if (UserData) return UserData
  const Send = useSend(e)
  Send(Text('查无此人'))
  return false
}

export async function victoryCooling(e, UID: string, CDID: Burial.CDType) {
  const { state, msg } = await Burial.cooling(UID, CDID)
  if (state == 4001) {
    const Send = useSend(e)
    Send(Text(msg))
    return false
  }
  return true
}

export async function endAllWord(
  e: EventsMessageCreateEnum,
  UID: string,
  UserData: UserDataType
) {
  const mapText = {
    1: '只是呆了一会儿',
    2: '走累了,就停一停吧',
    8: '不太专注的放弃了'
  }
  const Send = useSend(e)
  if (!mapText[UserData.state]) {
    setTimeout(() => {
      Send(Text('哎哟,你干嘛'))
    }, 1000)
    return true
  }
  const startTime = UserData.state_start_time
  let time = Math.floor((Date.now() - startTime) / 60000)
  if (isNaN(time)) time = 10
  if (time <= 1) {
    setTimeout(() => {
      Send(Text(`${mapText[UserData.state]}...`))
    }, 1000)
    await State.del(UID)
    return true
  }
  const map = {
    1: async () => {
      //闭关
      await upgrade(e, UID, time, 0, 1, UserData)
    },
    2: async () => {
      // 椴体
      await upgrade(e, UID, time, 1, 2, UserData)
    },
    8: async () => {
      // 聚灵
      await condensateGas(e, UID, time, UserData)
    }
  }
  await map[UserData.state]()
  await State.del(UID)
  return true
}

export async function condensateGas(
  e: EventsMessageCreateEnum,
  UID: string,
  time: number,
  UserData: UserDataType
) {
  const size = Math.floor((time * (UserData.talent_size + 100)) / 100)
  const limit = UserData.special_spiritual_limit
  let special_spiritual = UserData.special_spiritual
  special_spiritual += size
  if (special_spiritual >= limit) {
    special_spiritual = limit
  }
  await user.update(
    {
      special_spiritual: special_spiritual
    },
    {
      where: {
        uid: UID
      }
    }
  )
  setTimeout(() => {
    const Send = useSend(e)
    //
    Send(
      Text(
        UserData.immortal_grade > 0
          ? `当前仙力${special_spiritual}/${limit}`
          : `当前灵力${special_spiritual}/${limit}`
      )
    )
  }, 1000)
}

/**
 *
 * @param e
 * @param UID
 * @param time
 * @param key
 * @param type
 */
export async function upgrade(
  e: EventsMessageCreateEnum,
  UID: string,
  time: number,
  key: number,
  type: 1 | 2 | 3,
  UserData: UserDataType
) {
  const config = {
    1: Cooling.work_size,
    0: Cooling.biguan_size
  }
  // 获取数值
  let other = Math.floor(
    (config[key] * time * (UserData.talent_size + 100)) / 100
  )
  // 一定概率减少数值
  if (Math.random() * (100 - 1) + 1 < 20) {
    other -= Math.floor(other / 3)
  }
  // 为nan修正数值
  if (isNaN(other)) {
    other = 1
  }
  // 上限是10w
  if (other > 100000) {
    other = 100000
  }
  const msg: string[] = []
  if (type != 1) {
    msg.push(`锻体凝脉\n[气血]*${other}`)
  } else {
    msg.push(`闭关结束\n[修为]*${other}`)
    // 更新血量
    const blood = await Equipment.addBlood(UserData, time * 10)
    msg.push(`\n[血量]恢复了${time * 10 >= 100 ? 100 : time * 10}%`)
    msg.push(`\n🩸${blood}`)
  }
  // 经验增加
  await Levels.addExperience(UID, type, other)
  setTimeout(() => {
    const Send = useSend(e)
    Send(Text(msg.join('')))
  }, 1000)
}

/**
 * 渡劫失败惩罚
 * @param e
 * @param UID
 * @param size
 * @returns
 */
export async function punishLevel(
  e: EventsMessageCreateEnum,
  UID: string,
  UserData: UserDataType
) {
  /**
   * 渡劫失败惩罚
   *
   * 20%*灵根数 -5%*变异灵根数 = 成功概率
   * 五 100%   掉经验+清血量+概率掉物品
   * 四 80%    掉境界+掉经验+清血量
   * 三 60%    所有境界掉1级+所有经验清空+清血量
   * 二 40%    所有境界掉3级+所有经验清空+清血量
   * 一 20%    死亡+清血量
   */

  // 得到用户数据
  const Userexp = await user_level
    .findOne({
      where: {
        uid: UID,
        type: 1
      }
    })
    .then(res => res?.dataValues)
  //
  const Userbool = await user_level
    .findOne({
      where: {
        uid: UID,
        type: 2
      }
    })
    .then(res => res?.dataValues)
  //
  const Usershen = await user_level
    .findOne({
      where: {
        uid: UID,
        type: 3
      }
    })
    .then(res => res?.dataValues)

  await user.update(
    { battle_blood_now: 0 },
    {
      where: {
        uid: UID
      }
    }
  )

  const Send = useSend(e)

  switch (UserData.talent.length) {
    case 1: {
      setTimeout(async () => {
        // 更新
        user_level.update({ experience: 0 }, { where: { uid: UID } })
        Send(Text('[灭世之雷]击中了你的道韵,修为清空,化作尘埃'))
      }, 6000)
      break
    }
    case 2: {
      setTimeout(async () => {
        user_level.update(
          { experience: Math.floor(Userexp.experience * 0.75) },
          { where: { uid: UID, type: 1 } }
        )
        user_level.update(
          { experience: Math.floor(Userbool.experience * 0.75) },
          { where: { uid: UID, type: 2 } }
        )
        user_level.update(
          { experience: Math.floor(Usershen.experience * 0.75) },
          { where: { uid: UID, type: 3 } }
        )
        Send(Text('[灭世之雷]击中了你的道韵,损失部分修为'))
      }, 6000)
      break
    }
    case 3: {
      setTimeout(async () => {
        user_level.update(
          { experience: Math.floor(Userexp.experience * 0.5) },
          { where: { uid: UID, type: 1 } }
        )
        user_level.update(
          { experience: Math.floor(Userbool.experience * 0.5) },
          { where: { uid: UID, type: 2 } }
        )
        user_level.update(
          { experience: Math.floor(Usershen.experience * 0.5) },
          { where: { uid: UID, type: 3 } }
        )
        Send(Text('[灭世之雷]击中了你的道韵,损失一半修为'))
      }, 6000)
      break
    }
    case 4: {
      setTimeout(async () => {
        user_level.update(
          { experience: Math.floor(Userexp.experience * 0.25) },
          { where: { uid: UID, type: 1 } }
        )
        user_level.update(
          { experience: Math.floor(Userbool.experience * 0.25) },
          { where: { uid: UID, type: 2 } }
        )
        user_level.update(
          { experience: Math.floor(Usershen.experience * 0.25) },
          { where: { uid: UID, type: 3 } }
        )
        Levels.fallingRealm(UID, 1)
        Send(Text['[灭世之雷]击中了你的道韵,损失部分修为'])
      }, 6000)
      break
    }
    case 5: {
      setTimeout(async () => {
        user_level.update(
          { experience: Math.floor(Userexp.experience * 0.15) },
          { where: { uid: UID, type: 1 } }
        )
        user_level.update(
          { experience: Math.floor(Userbool.experience * 0.15) },
          { where: { uid: UID, type: 2 } }
        )
        user_level.update(
          { experience: Math.floor(Usershen.experience * 0.15) },
          { where: { uid: UID, type: 3 } }
        )
        Levels.fallingRealm(UID, 1)
        Send(Text('[灭世之雷]击中了你的道韵,损失部分修为'))
      }, 6000)
      break
    }
  }
}
