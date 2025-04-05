import { goods, user_bag, user_bag_message } from '@xiuxian/db/index'
import { literal } from 'sequelize'
import { acquireLock, releaseLock } from '../../wrap/lock.js'

/**
 * 给UID添加物品
 * @param UID
 * @param arr
 * @returns
 */
export async function addBagThing(
  UID: string,
  arr: {
    name: string
    acount: number
  }[]
) {
  const resource = `bag:${UID}`
  const lockValue = await acquireLock(resource)
  try {
    let bag_message = await user_bag_message.findOneValue({
      where: {
        uid: UID
      }
    })
    if (!bag_message) {
      bag_message = {
        id: 1,
        uid: UID,
        grade: 1
      }
      await user_bag_message.create({
        uid: UID,
        grade: 1
      })
    }
    for (const { name, acount } of arr) {
      const THING = await goods.findOneValue({
        where: {
          name
        }
      })
      if (!THING) continue
      const length = await user_bag.count({
        where: {
          uid: UID,
          name: name
        }
      })
      // 当前储物袋格子已到极限
      if (length >= bag_message.grade * 10) break
      // 查找物品
      const existingItem = await user_bag.findOneValue({
        where: {
          uid: UID,
          name: name
        }
      })
      // 存在则更新
      if (existingItem) {
        await user_bag.update(
          {
            acount: Number(existingItem.acount) + Number(acount)
          },
          {
            where: {
              uid: UID,
              name: THING.name
            }
          }
        )
      } else {
        // 如果物品不存在，则创建新数据条目
        await user_bag.create({
          uid: UID, //编号
          tid: THING.id, // 物品编号
          type: THING.type, //物品类型
          name: THING.name, // 物品名
          acount: acount // 物品数量
        })
      }
    }
  } finally {
    await releaseLock(resource, lockValue)
  }
}

/**
 * 给UID减少物品
 * @param UID
 * @param arr
 * @returns
 */
export async function reduceBagThing(
  UID: string,
  arr: {
    name: string
    acount: number
  }[]
) {
  const resource = `bag:${UID}`
  const lockValue = await acquireLock(resource)
  try {
    for (const { name, acount } of arr) {
      const data = await searchBagByName(UID, name)
      // 不存在该物品
      if (!data) continue
      // 计算
      const ACCOUNT = Number(data.acount) - Number(acount)
      // 有效数量
      if (ACCOUNT >= 1) {
        await user_bag.update(
          {
            acount: ACCOUNT
          },
          {
            where: {
              uid: UID,
              name: name
            }
          }
        )
        continue
      }
      // 删除该物品
      await user_bag.destroy({
        where: {
          uid: UID,
          name: name
        }
      })
    }
  } finally {
    await releaseLock(resource, lockValue)
  }
}

/**
 * 检查储物袋是否已满
 * @param UID
 * @returns
 */
export async function backpackFull(UID: string) {
  let bag_message = await user_bag_message.findOneValue({
    where: {
      uid: UID
    }
  })
  if (!bag_message) {
    bag_message = {
      id: 1,
      uid: UID,
      grade: 1
    }
    await user_bag_message.create({
      uid: UID,
      grade: 1
    })
  }
  const length = await user_bag.count({
    where: {
      uid: UID
    }
  })
  const size = bag_message.grade * 10
  const n = size - length
  // 至少有空位置的时候返回n
  return n >= 1 ? n : false
}

export async function searchAllByName(UID: string, name: string[]) {
  const data = await user_bag.findAllValues({
    where: {
      uid: UID,
      name
    }
  })
  return data
}

/**
 * 搜索UID的储物袋有没有物品名为NAME
 * @param UID
 * @param name
 * @returns
 */
export async function searchBagByName(UID: string, name: string, acount = 1) {
  const data = await user_bag.findOneValue({
    where: {
      uid: UID,
      name
    }
  })
  if (data && data.acount >= acount) {
    const good = await goods.findOneValue({
      where: {
        name
      }
    })
    return {
      ...good,
      acount: data.acount
    }
  }
  return false
}

/**
 * 随机掉一个物品,
 * 并把物品名返回,
 * 如果没有则返回为空[]
 * @param UID
 * @returns
 */
export async function delThing(UID: string, size = 100, t = false) {
  /**
   *
   */

  const data = await user_bag.findOneValue({
    where: {
      uid: UID
    },
    // 进行随机排序
    order: literal('RAND()')
  })

  if (!data) return []
  // 击碎

  if (t) {
    if (data.acount <= 11) {
      reduceBagThing(UID, [
        {
          name: data.name,
          acount: data.acount
        }
      ])
    } else if (data.acount >= 102 && data.acount >= 12) {
      reduceBagThing(UID, [
        {
          name: data.name,
          acount: Math.floor(data.acount / 10)
        }
      ])
    } else {
      // 101/100 == 1
      reduceBagThing(UID, [
        {
          name: data.name,
          acount: Math.floor(data.acount / size) + 100
        }
      ])
    }
  } else {
    reduceBagThing(UID, [
      {
        name: data.name,
        acount: data.acount
      }
    ])
  }
  return [data]
}
