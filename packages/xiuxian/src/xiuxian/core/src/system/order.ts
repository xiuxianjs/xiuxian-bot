import { user_transactions, user_transactions_logs } from '@xiuxian/db/index'
import { acquireLock, releaseLock } from '../wrap/lock.js'

/**
 * 删除物品
 * @param ID
 */
export async function delThing(ID: number) {
  const resource = `order:${ID}`
  const lockValue = await acquireLock(resource)
  let t = false
  try {
    // 搜索物品。
    const data = await user_transactions.findOneValue({
      where: {
        id: ID
      }
    })

    if (!data) return t

    // 删除交易物品
    await user_transactions.destroy({
      where: {
        id: data.id
      }
    })

    // 添加购买记录
    await user_transactions_logs.create({
      ...data
    })

    t = true
  } finally {
    await releaseLock(resource, lockValue)
  }
  return t
}
