import { Redis } from '@src/xiuxian/db'

/**
 * 添加玩家某个地点的ID
 * @param playerId
 * @param uid
 */
export const addAddressToId = async (playerId: string, uid: string) => {
  const currentId = await Redis.get(`xiuxian:user:address:${uid}`)
  if (currentId) {
    // 从旧地址中删除玩家 UID
    await Redis.srem(`xiuxian:map:address:${currentId}`, uid)
  }
  // 添加玩家到新地址
  await Redis.sadd(`xiuxian:map:address:${playerId}`, uid)
  // 更新玩家的地址记录
  await Redis.set(`xiuxian:user:address:${uid}`, playerId)
}

/**
 * 查询某个 ID 下的所有玩家 UID
 * @param playerId
 * @returns
 */
export async function getAddressById(playerId: string) {
  const players = await Redis.smembers(`xiuxian:map:address:${playerId}`)
  return players
}

/**
 * 从某个 ID 中移除玩家
 * @param playerId
 * @param uid
 */
export async function removeAddressFromId(playerId: string, uid: string) {
  // 从地址集合中移除玩家 UID
  await Redis.srem(`xiuxian:map:address:${playerId}`, uid)
  // 删除玩家的地址记录
  await Redis.del(`xiuxian:user:address:${uid}`)
}
