import { user_bag } from './models/user/user_bag.js'
import { goods } from './models/goods.js'
import { user_skills } from './models/user/user_skills.js'
import { user_equipment } from './models/user/user_equipment.js'
import { user_fate } from './models/user/user_fate.js'
import { user_ring } from './models/user/user_ring.js'
import { user_ass } from './models/user/user_ass.js'
import { ass } from './models/ass/ass.js'
import { ass_typing } from './models/ass_typing.js'
import { ass_bag } from './models/ass/ass_bag.js'
import { user } from './models/user/user.js'
import { user_transactions } from './models/user/user_transactions.js'
import { user_transactions_logs } from './models/user/user_transactions_logs.js'
import { ass_bag_message } from './models/ass/ass_bag_message.js'
import { user_buy_log } from './models/user/user_buy_log.js'
import { user_ass_apply } from './models/user/user_ass_apply.js'
import { goods_alliancemall } from './models/goods_alliancemall.js'
import { goods_commodities } from './models/goods_commodities.js'
import { goods_drops } from './models/goods_drops.js'
import { monster } from './models.js'
import { fate_level } from './models.js'
import { map_treasure } from './models.js'
import { map_point } from './models.js'
import { talent } from './models.js'
import { map_position } from './models.js'
import { levels } from './models.js'
import { skys } from './models.js'
import { constitution } from './models/constitution.js'
import { levels_limit } from './models/levels_limit.js'

export const BaseModels = {
  ass_typing,
  skys,
  monster,
  goods,
  goods_alliancemall,
  goods_commodities,
  goods_drops,
  fate_level,
  levels,
  talent,
  map_point,
  map_position,
  map_treasure,
  constitution,
  levels_limit
}

export const useBelongsTo = () => {
  /**
   * user
   */
  user_ring.belongsTo(goods, { foreignKey: 'name', targetKey: 'name' })
  user_bag.belongsTo(goods, { foreignKey: 'name', targetKey: 'name' })
  user_skills.belongsTo(goods, { foreignKey: 'name', targetKey: 'name' })
  user_equipment.belongsTo(goods, { foreignKey: 'name', targetKey: 'name' })
  user_fate.belongsTo(goods, { foreignKey: 'name', targetKey: 'name' })
  /**
   * user_buy
   */
  user_buy_log.belongsTo(goods, { foreignKey: 'name', targetKey: 'name' })
  user_buy_log.belongsTo(user, { foreignKey: 'uid', targetKey: 'uid' })
  /**
   * user_ass
   */
  user_ass.belongsTo(ass, { foreignKey: 'aid', targetKey: 'id' })
  user_ass.belongsTo(user, { foreignKey: 'uid', targetKey: 'uid' })
  user_ass_apply.belongsTo(ass, { foreignKey: 'aid', targetKey: 'id' })
  user_ass_apply.belongsTo(user, { foreignKey: 'uid', targetKey: 'uid' })
  /**
   * ass
   */
  ass.belongsTo(ass_typing, { foreignKey: 'typing', targetKey: 'id' })
  ass_bag.belongsTo(goods, { foreignKey: 'name', targetKey: 'name' })
  ass_bag_message.belongsTo(ass, { foreignKey: 'aid', targetKey: 'id' })
  /**
   * transactions
   */
  user_transactions.belongsTo(goods, { foreignKey: 'name', targetKey: 'name' })
  user_transactions.belongsTo(user, { foreignKey: 'uid', targetKey: 'uid' })
  user_transactions_logs.belongsTo(goods, {
    foreignKey: 'name',
    targetKey: 'name'
  })
  user_transactions_logs.belongsTo(user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  /**
   * goods
   */
  goods_alliancemall.belongsTo(goods, { foreignKey: 'gid', targetKey: 'id' })
  goods_commodities.belongsTo(goods, { foreignKey: 'gid', targetKey: 'id' })
  goods_drops.belongsTo(goods, { foreignKey: 'gid', targetKey: 'id' })
}
