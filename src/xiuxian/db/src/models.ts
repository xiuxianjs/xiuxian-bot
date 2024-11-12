import { monster } from './models.js'
import { goods_alliancemall } from './models.js'
import { goods_drops } from './models.js'
import { fate_level } from './models.js'
import { map_treasure } from './models.js'
import { map_point } from './models.js'
import { talent } from './models.js'
import { map_position } from './models.js'
import { levels } from './models.js'
import { email } from './models.js'
import { goods_commodities } from './models.js'
import { goods } from './models.js'
import { skys } from './models.js'
import { ass_typing } from './models.js'
/**
 * 基础标
 */
export * from './models/ass_typing.js'
export * from './models/skys.js'
// 怪物表
export * from './models/monster.js'
// 商品
export * from './models/goods.js'
export * from './models/goods_alliancemall.js'
export * from './models/goods_commodities.js'
export * from './models/goods_drops.js'
//
export * from './models/email.js'
//
export * from './models/fate_level.js'
export * from './models/levels.js'
//
export * from './models/talent.js'
//
export * from './models/map_point.js'
export * from './models/map_position.js'
export * from './models/map_treasure.js'
/**
 * 增值表
 */
// 势力
export * from './models/ass/ass.js'
export * from './models/ass/ass_bag.js'
export * from './models/ass/ass_bag_message.js'
// 用户
export * from './models/user/user.js'
export * from './models/user/user_log.js'
export * from './models/user/user_ring.js'
export * from './models/user/user_bag.js'
export * from './models/user/user_level.js'
export * from './models/user/user_equipment.js'
export * from './models/user/user_skills.js'
export * from './models/user/user_fate.js'
export * from './models/log/user_buy_log.js'
export * from './models/user/user_sky_reward.js'
export * from './models/user/user_bag_message.js'
export * from './models/user/user_email.js'
export * from './models/user/user_sky_ranking.js'
export * from './models/user/user_ass.js'
export * from './models/user/user_ass_apply.js'
export * from './models/log/user_transactions_logs.js'
export * from './models/transactions/transactions.js'

export const BaseModels = {
  ass_typing,
  skys,
  monster,
  goods,
  goods_alliancemall,
  goods_commodities,
  goods_drops,
  email,
  fate_level,
  levels,
  talent,
  map_point,
  map_position,
  map_treasure
}
