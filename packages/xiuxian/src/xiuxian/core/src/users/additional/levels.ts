import { levels, user, user_level } from '@xiuxian/db/index'

export const LEVELMAP = {
  1: 'gaspractice',
  2: 'bodypractice',
  3: 'soul'
}
export const NAMEMAP = {
  1: '修为',
  2: '气血',
  3: '神念'
}
export const CopywritingLevel = {
  0: '🤪突然听到一声鸡叫,鸡..鸡..鸡...鸡你太美!险些走火入魔,丧失了size[name]',
  1: '🤪突破时想到鸡哥了,险些走火入魔,丧失了size[name]',
  2: '🤪突破时突然想起后花园种有药草,强行打断突破,嘴角流血,丧失了size[name]',
  3: '🤪突破失败,丧失了size[name]',
  4: '🤪突破失败,你刚刚气沉丹田就被一口老痰差点噎死,丧失了size[name]',
  5: '🤪噗～你一口老血喷了出,突破失败,丧失了size[name]',
  6: '🤪砰!你突破时身后的柜子动了一下,吓得你一时不敢突破并丧失了size[name]',
  7: '🤪突破失败,你也不知道为啥,并且丧失了size[name]',
  8: '🤪突破失败,可能是因为姿势不对吧,你尝试换了个姿势,发现丧失了size[name]',
  9: '🤪突破失败,你差一点就成功了,你决定再试一次,可惜刚入定就被反噬,丧失了size[name]',
  10: '🤪突破失败,因为今天是KFC疯狂星期四,决定不突破了去吃了KFC,回来直接变身喷射战士,并丧失了size[name]'
}

/**
 * 随机key
 * @returns
 */
export function getRandomKey() {
  const keyArray = Object.keys(CopywritingLevel)
  const randomKey = keyArray[Math.floor(Math.random() * keyArray.length)]
  return Number(randomKey)
}

/**
 * 随机一个失败文案
 * @param id
 * @param randomKey
 * @param size
 * @returns
 */
export function getCopywriting(id: number, randomKey: number, size: number) {
  const name = NAMEMAP[id]
  const copywriting = CopywritingLevel[randomKey]
  const result = copywriting.replace('size[name]', `${size}[${name}]`)
  return result
}

/**
 * 提升境界
 * @param UID
 * @param type
 * @returns
 */
export async function enhanceRealm(UID: string, type: 1 | 2 | 3) {
  //
  const UserLevel = await user_level.findOneValue({
    where: {
      uid: UID,
      type
    }
  })

  //
  const realm = UserLevel?.realm

  // 查看是否是渡劫
  const LevelListMax = await levels.findAllValues({
    where: {
      type
    },
    order: [['grade', 'DESC']],
    limit: 3
  })

  //
  const data = LevelListMax[1]

  //
  if (!data || realm == data.grade) {
    return {
      state: 4001,
      msg: `道友已至瓶颈,唯寻得真理,方成大道`
    }
  }

  //
  const nowLevel = await levels.findOneValue({
    where: {
      type,
      grade: realm
    }
  })

  //
  const nextLevel = await levels.findOneValue({
    where: {
      type,
      grade: realm + 1
    }
  })

  //
  if (!nowLevel || !nextLevel) {
    return {
      state: 4001,
      msg: '已看破天机'
    }
  }
  // 判断经验够不够
  if (UserLevel.experience < nowLevel.exp_needed) {
    return {
      state: 4001,
      msg: `${NAMEMAP[type]}不足`
    }
  }

  /***
   * 境界变动的时候更新
   */
  if (type == 1) {
    user.update(
      {
        special_spiritual_limit: 100 + UserLevel.realm
      },
      {
        where: {
          uid: UID
        }
      }
    )
  }

  // 保存境界信息
  await user_level.update(
    {
      addition: 0,
      realm: nextLevel.grade,
      experience: UserLevel.experience - nextLevel.exp_needed
    },
    {
      where: {
        type,
        uid: UID
      }
    }
  )

  //
  return {
    state: 2000,
    msg: `境界提升至${nextLevel.name}`
  }
}

/**
 * 掉落境界
 * @param UID
 * @param type
 * @returns
 */
export async function fallingRealm(UID: string, type: 1 | 2 | 3, size = 1) {
  const UserLevel = await user_level.findOneValue({
    where: {
      uid: UID,
      type
    }
  })
  const realm = UserLevel.realm
  const data = await levels.findOneValue({
    where: {
      grade: realm - size,
      type
    }
  })
  // 并没有
  if (!data) {
    return {
      state: 4001,
      msg: null
    }
  }
  // 调整境界
  UserLevel.realm -= 1
  /**
   * 境界变动的时候更新
   */
  if (type == 1) {
    user.update(
      {
        special_spiritual_limit: 100 + UserLevel.realm
      },
      {
        where: {
          uid: UID
        }
      }
    )
  }
  // 保存境界信息

  await user_level.update(
    {
      addition: 0,
      realm: UserLevel.realm,
      experience: UserLevel.experience
    },
    {
      where: {
        type,
        uid: UID
      }
    }
  )

  return {
    state: 2000,
    msg: `境界跌落至${data.name}`
  }
}

/**
 * 经验增加
 * @param UID
 * @param type
 * @param size
 * @param number
 * @returns
 */
export async function addExperience(
  UID: string,
  type: 1 | 2 | 3,
  size: number,
  number = 5
) {
  const UserLevel = await user_level.findOneValue({
    where: {
      uid: UID,
      type
    }
  })
  if (isNaN(UserLevel.experience)) {
    UserLevel.experience = 0
  }
  UserLevel.experience += size ?? 0
  if (UserLevel.experience > 999999999) UserLevel.experience = 999999999
  // 增加突破概率
  if (number) {
    const size = Number(UserLevel.addition)
    UserLevel.addition = size + number
  }
  await user_level.update(
    {
      experience: UserLevel.experience,
      addition: UserLevel.addition
    },
    {
      where: {
        type,
        uid: UID
      }
    }
  )
  return {
    state: 2000,
    msg: `[${NAMEMAP[type]}]+${size}`
  }
}

/**
 * 经验减少
 * @param UID
 * @param type
 * @param size
 * @returns
 */
export async function reduceExperience(
  UID: string,
  type: 1 | 2 | 3,
  size: number
) {
  const UserLevel = await user_level.findOneValue({
    where: {
      uid: UID,
      type
    }
  })
  UserLevel.experience -= size
  if (UserLevel.experience < 0) UserLevel.experience = 0

  await user_level.update(
    {
      experience: UserLevel.experience
    },
    {
      where: {
        type,
        uid: UID
      }
    }
  )

  return {
    state: 2000,
    msg: `[${NAMEMAP[type]}]+${size}`
  }
}

/**
 * 是否是渡劫期
 * @param UID
 * @param id
 * @returns
 */
export async function isLevelPoint(UID: string, type: 1 | 2 | 3) {
  const UserLevel = await user_level.findOneValue({
    where: {
      uid: UID,
      type
    }
  })
  const LevelList = await levels.findAllValues({
    where: {
      type
    },
    order: [['grade', 'DESC']],
    limit: 3
  })
  // 选最高的第二个就是渡劫期
  const data = LevelList[1]
  // 境界不存在,出去
  if (!data) return false
  // 不是一个境界 出去
  if (UserLevel.realm != data.grade) return false
  // 判断经验够不够
  if (UserLevel.experience < data.exp_needed) return false
  // 完成
  return true
}
