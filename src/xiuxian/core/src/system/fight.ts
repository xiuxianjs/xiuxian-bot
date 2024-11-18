import { isProbability } from '../wrap/method.js'

export const Sneakattack = [
  '[A]想偷袭,[B]一个转身就躲过去了', // 偷袭
  '[A]偷袭,可刹那间连[B]的影子都看不到', // 偷袭
  '[A]找准时机,突然暴起冲向[B],但是[B]反应及时,[B]反手就把[A]打死了', // 回合
  '[A]突然一个左勾拳,谁料[B]揭化发,击败了[A]', // 回合
  '[A]一拳挥出,如流云遁日般迅疾轻捷,风声呼啸,草飞沙走,看似灵巧散漫,实则花里胡哨,[B]把[A]打得口吐鲜血,身影急退,掉落山崖而亡', // 回合
  '[A]拳之上凝结了庞大的气势,金色的光芒遮天蔽日,一条宛若黄金浇铸的真龙形成,浩浩荡荡地冲向[B],但[A]招式过于花里胡哨,[B]一个喷嚏就把[A]吹晕了', // 回合
  '[A]打的山崩地裂，河水倒卷，余波万里,可恶,是幻境,什么时候![B]突然偷袭,背后一刀捅死了[A]' // 回合
]

type UserBattleType = {
  uid: string
  name: string
  battle_show: number
  battle_blood_now: number
  battle_attack: number
  battle_defense: number
  battle_blood_limit: number
  battle_critical_hit: number
  battle_critical_damage: number
  battle_speed: number
  battle_power: number
  // 仙人等级。在伤害 = 战力 * （1 + grade * 0.1）
  immortal_grade: number
}

/**
 * 计算增值
 * @param value
 * @returns
 */
export const getImmortalValue = (value: number, grade: number, val = 0.01) => {
  return Math.floor(value * getImmortalGradeValue(grade, val))
}

/**
 *
 * @param grade
 * @returns
 */
export const getImmortalGradeValue = (grade: number, val = 0.01) => {
  return Number((1 + val * grade).toFixed(2))
}

const getOriginal = (UserA: UserBattleType, UserB: UserBattleType) => {
  return (
    // 攻击 - 防御
    getImmortalValue(UserA.battle_attack, UserA.immortal_grade) -
    UserB.battle_defense
  )
}

const getOutbreak = (HurtA, UserA: UserBattleType) => {
  return (HurtA.original * (100 + UserA.battle_critical_damage)) / 100
}

/**
 *
 * @param UserA
 * @param UserB
 * @returns
 */
const getHurt = (UserA: UserBattleType, UserB: UserBattleType) => {
  const HurtA = {
    original: 0, // 原始伤害
    outbreak: 0 // 暴伤
  }
  const HurtB = {
    original: 0, // 原始伤害
    outbreak: 0 // 暴伤
  }

  // 原始伤害计算
  const originalA = getOriginal(UserA, UserB)

  HurtA.original = originalA > 50 ? originalA : 50
  // 暴击结算
  HurtA.outbreak = getOutbreak(HurtA, UserA)
  // boss 反击
  const originalB = getOriginal(UserB, UserA)
  // 原始伤害计算
  HurtB.original = originalB > 50 ? originalB : 50
  // 暴击结算
  HurtB.outbreak = getOutbreak(HurtB, UserB)
  return {
    HurtA,
    HurtB
  }
}

const getBlood = (User: UserBattleType) => {
  return getImmortalValue(User.battle_blood_now, User.immortal_grade, 0.1)
}

const getNowBlood = (User: UserBattleType, blood: number) => {
  if (blood <= 1) {
    return 1
  }
  const p = blood / getBlood(User)
  return Math.floor(User.battle_blood_now * p)
}

/**
 * 和boss战斗的模型
 * 战斗只会攻击一下
 * 他反击一下
 * 没有回合
 * @param UserA
 * @param UserB
 */
export function startBoss(UserA: UserBattleType, UserB: UserBattleType) {
  // 伤害
  const { HurtA, HurtB } = getHurt(UserA, UserB)
  // 血量
  let bloodA = getBlood(UserA)
  let bloodB = getBlood(UserB)
  const msg = []
  // 玩家造成的伤害
  let size = 0
  const Aac = () => {
    if (isProbability(UserA.battle_critical_hit)) {
      // 暴击
      bloodB -= HurtA.outbreak
      size = HurtA.outbreak
      msg.push(
        `老六[${UserA.name}]对[${UserB.name}]造成 ${HurtA.outbreak} 暴击伤害`
      )
    } else {
      // 普通结算
      bloodB -= HurtA.original
      size = HurtA.original
      msg.push(
        `老六[${UserA.name}]对[${UserB.name}]造成 ${HurtA.original} 普通伤害`
      )
    }
  }

  // a先攻击
  Aac()

  // 看看boss有没有死
  if (bloodB <= 0) {
    msg.push(`[${UserA.name}]仅出此招,就击败了[${UserB.name}]!`)
    bloodB = 0
    return {
      size: size,
      battle_blood_now: {
        a: getNowBlood(UserA, bloodA),
        b: getNowBlood(UserB, bloodB)
      },
      victory: UserA.uid, // a胜利了
      msg
    }
  }

  //
  const Bac = () => {
    if (isProbability(UserB.battle_critical_hit)) {
      bloodA -= HurtB.outbreak
      msg.push(
        `[${UserB.name}]对[${UserA.name}]造成 ${HurtB.outbreak} 暴击伤害`
      )
    } else {
      // 普通结算
      bloodA -= HurtB.original
      msg.push(
        `[${UserB.name}]对[${UserA.name}]造成 ${HurtB.original} 普通伤害`
      )
    }
  }
  Bac()

  // 看看玩家有没有死

  if (bloodA <= 0) {
    msg.push(`[${UserB.name}]打死了[${UserA.name}]!`)
    bloodA = 0
    return {
      // 造成的总伤害
      size: size,
      battle_blood_now: {
        a: getNowBlood(UserA, bloodA),
        b: getNowBlood(UserB, bloodB)
      },
      victory: UserB.uid, // b胜利了
      msg
    }
  }

  return {
    // 造成的总伤害
    size: size,
    // 双方血量
    battle_blood_now: {
      a: getNowBlood(UserA, bloodA),
      b: getNowBlood(UserB, bloodB)
    },
    // a赢了
    victory: '0',
    // 消息
    msg
  }
}

/**
 * 战斗模型
 * @param param0
 * @param param1
 * @returns
 */
export function start(UserA: UserBattleType, UserB: UserBattleType) {
  const { HurtA, HurtB } = getHurt(UserA, UserB)

  let bloodA = getBlood(UserA)
  let bloodB = getBlood(UserB)

  // 战斗消息
  const msg: string[] = []

  bloodA = getImmortalValue(bloodA, UserA.immortal_grade)

  bloodB = getImmortalValue(bloodB, UserB.immortal_grade)

  // 胜利判断

  let victory = '0'

  const Aac = () => {
    if (isProbability(UserA.battle_critical_hit)) {
      bloodB -= HurtA.outbreak
      msg.push(
        `老六[${UserA.name}]偷袭成功,对[${UserB.name}]造成 ${HurtA.outbreak} 暴击伤害`
      )
    } else {
      // 普通结算
      bloodB -= HurtA.original
      msg.push(
        `老六[${UserA.name}]偷袭成功,对[${UserB.name}]造成 ${HurtA.original} 普通伤害`
      )
    }
  }

  // 敏捷判断 如果 A敏捷 < B敏捷 - 5
  if (UserA.battle_speed < UserB.battle_speed - 5) {
    // 对方敏捷扣除缺不比对方大
    msg.push(
      `${Sneakattack[Math.floor(Math.random() * 2)]
        .replace('A', UserA.name)
        .replace('B', UserB.name)}`
    )
  } else {
    // aac
    Aac()
    /**
     * b血量减少
     */
    if (bloodB < 1) {
      msg.push(`[${UserA.name}]仅出此招,就击败了[${UserB.name}]!`)
      bloodB = 0
      // 返回双方变更值
      return {
        battle_blood_now: {
          a: getNowBlood(UserA, bloodA),
          b: getNowBlood(UserB, bloodB)
        },
        victory: UserA.uid, // a胜利了
        msg
      }
    }
  }

  const Bac = () => {
    if (isProbability(UserB.battle_critical_hit)) {
      bloodA -= HurtB.outbreak
      msg.push(
        `第${round}回合,[${UserB.name}]对[${UserA.name}]造成 ${HurtB.outbreak} 暴击伤害`
      )
    } else {
      // 普通结算
      bloodA -= HurtB.original
      msg.push(
        `第${round}回合,[${UserB.name}]对[${UserA.name}]造成 ${HurtB.original} 普通伤害`
      )
    }
  }

  let round = 0,
    T = true

  // 战斗循环
  while (T) {
    round++

    /**
     * 正常回合,a未偷袭成功,b先开始
     */

    /**
     * 是否暴击
     */
    Bac()

    /**  判断血量  */
    if (bloodA <= 0) {
      const replacements = {
        A: UserA.name,
        B: UserB.name
      }
      // A 没血了  b 赢了
      victory = UserB.uid
      bloodB = bloodB >= 0 ? bloodB : 0
      bloodA = 0
      msg.push(
        `${Sneakattack[Math.ceil(Math.random() * 5) + 1].replace(
          /A|B/g,
          match => replacements[match]
        )}`
      )
      T = false
      break
    }

    if (round >= 16) {
      /** 30个回合过去了 */
      msg.push(
        `${UserA.name}]与[${UserB.name}]势均力敌.经过了${round}回合都奈何不了对方`
      )
      T = false
      break
    }

    // Aac
    Aac()

    if (bloodB <= 0) {
      // B 没血了  A 赢了
      const replacements = {
        A: UserB.name,
        B: UserA.name
      }
      victory = UserA.uid
      //
      bloodA = bloodA >= 0 ? bloodA : 0
      //
      bloodB = 0
      msg.push(
        `${Sneakattack[Math.ceil(Math.random() * 5) + 1].replace(
          /A|B/g,
          match => replacements[match]
        )}`
      )
      T = false
      break
    }
  }

  return {
    battle_blood_now: {
      a: getNowBlood(UserA, bloodA),
      b: getNowBlood(UserB, bloodB)
    },
    victory,
    msg
  }
}
