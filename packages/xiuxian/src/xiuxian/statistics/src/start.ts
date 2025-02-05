import * as DB from '@xiuxian/db/index'
import { type KillListType } from './types.js'
import { Redis } from '@xiuxian/db/index'
import { getImmortalValue } from '@src/xiuxian/core/src/system/fight.js'

// 开启刷新时间   // 一小时刷新一次  // 响应控制
const start_time = 30000
const continue_time = 3600000

/**
 * 得到
 * @param i
 * @returns
 */
export async function get(i: string) {
  const data = await Redis.get(i)
  if (data) return data
  return '[]'
}

/**
 * 设置
 * @param i
 * @param val
 */
export function set(i: string, val) {
  Redis.set(i, val)
}

/**
 * 得到杀神榜数据
 * @returns
 */
export async function getKillList() {
  //  得到玩家数据
  const ALLData = await DB.user
    .findAll({
      where: {
        delete: 1
      },
      order: [
        // 按照煞气降序排列
        ['special_prestige', 'DESC']
      ],
      limit: 5
    })
    .then(res => res.map(item => item?.dataValues))
  return ALLData.map(item => {
    return {
      id: item.id,
      autograph: item?.autograph, // 道宣
      lifeName: item?.name, // 道号
      prestige: item?.special_prestige, // 煞气
      power: getImmortalValue(item?.battle_power, item.immortal_grade), // 战力
      avatar: item?.avatar
    }
  }) as KillListType[]
}

export type killInformationType =
  ReturnType<typeof getKillList> extends Promise<infer T> ? T : never

// 更新杀神榜
export async function updataKillList() {
  // 写入缓存
  set(`xiuxian:list:kill`, JSON.stringify(await getKillList()))
}

// 开启的30秒计算一次,而后每小时刷新一次
setTimeout(() => {
  // 统计杀神榜
  updataKillList()
  console.info('[list] level update')
}, start_time)

setInterval(() => {
  // 统计杀神榜
  updataKillList()
}, continue_time)
