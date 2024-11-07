import { user_bag } from './models/user_bag.js'
import { goods } from './models/goods/goods.js'
import { user_skills } from './models/user_skills.js'
import { user_equipment } from './models/user_equipment.js'
import { user_fate } from './models/user_fate.js'
import { user_ring } from './models/user_ring.js'
import { user_ass } from './models/user_ass.js'
import { ass } from './models/ass.js'
import { ass_typing } from './models/ass_typing.js'
import { ass_bag } from './models/ass_bag.js'
import { user } from './models/user.js'
import { transactions } from './models/transactions.js'
import { transactions_logs } from './models/transactions_logs.js'
import { user_buy_log } from './models/user_buy_log.js'
import { sequelize } from './connect.js'
import {
  ass_bag_message,
  goods_alliancemall,
  goods_commodities,
  goods_drops,
  goods_limit,
  goods_palace,
  goods_wheeldisc,
  user_ass_apply
} from './models.js'

const belongsTo = () => {
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
  transactions.belongsTo(goods, { foreignKey: 'name', targetKey: 'name' })
  transactions.belongsTo(user, { foreignKey: 'uid', targetKey: 'uid' })
  transactions_logs.belongsTo(goods, { foreignKey: 'name', targetKey: 'name' })
  transactions_logs.belongsTo(user, { foreignKey: 'uid', targetKey: 'uid' })
  /**
   * goods
   */
  goods_alliancemall.belongsTo(goods, { foreignKey: 'gid', targetKey: 'id' })
  goods_commodities.belongsTo(goods, { foreignKey: 'gid', targetKey: 'id' })
  goods_drops.belongsTo(goods, { foreignKey: 'gid', targetKey: 'id' })
  goods_limit.belongsTo(goods, { foreignKey: 'gid', targetKey: 'id' })
  goods_palace.belongsTo(goods, { foreignKey: 'gid', targetKey: 'id' })
  goods_wheeldisc.belongsTo(goods, { foreignKey: 'gid', targetKey: 'id' })
}

await sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功.')

    belongsTo()
  })
  .catch(err => {
    console.error(err)
    console.log('数据库连接失败.')
    process.cwd()
  })
