import * as models from './models.js'

export { models }

export const users = {
  user_ass: models.user_ass,
  user_ass_apply: models.user_ass_apply,
  user_bag: models.user_bag,
  user_bag_message: models.user_bag_message,
  user_buy_log: models.user_buy_log,
  user_equipment: models.user_equipment,
  user_fate: models.user_fate,
  user_level: models.user_level,
  user_log: models.user_log,
  user_ring: models.user_ring,
  // users_email: models.users_email,
  user_sky_ranking: models.user_sky_ranking,
  user_sky_reward: models.user_sky_reward,
  user_transactions: models.user_transactions,
  user_transactions_logs: models.user_transactions_logs,
  msg: models.user,
  user_money: models.user_money
}

export const useBelongsTo = () => {
  /**
   * goods
   */
  models.goods_alliancemall.belongsTo(models.goods, {
    foreignKey: 'gid',
    targetKey: 'id'
  })
  models.goods_commodities.belongsTo(models.goods, {
    foreignKey: 'gid',
    targetKey: 'id'
  })
  models.goods_drops.belongsTo(models.goods, {
    foreignKey: 'gid',
    targetKey: 'id'
  })
  /**
   *
   */
  models.skys.belongsTo(models.goods, {
    foreignKey: 'gid',
    targetKey: 'id'
  })
  /**
   * user
   */
  models.user_bag_message.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_bag.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_buy_log.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_equipment.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_fate.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_level.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_log.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_ring.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_skills.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_sky_ranking.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_sky_ranking.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_transactions.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_transactions_logs.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_transactions_logs.belongsTo(models.goods, {
    foreignKey: 'name',
    targetKey: 'name'
  })
  models.user_fate.belongsTo(models.goods, {
    foreignKey: 'name',
    targetKey: 'name'
  })
  models.user_skills.belongsTo(models.goods, {
    foreignKey: 'name',
    targetKey: 'name'
  })
  models.user_transactions.belongsTo(models.goods, {
    foreignKey: 'name',
    targetKey: 'name'
  })
  models.user_equipment.belongsTo(models.goods, {
    foreignKey: 'name',
    targetKey: 'name'
  })
  models.user_ring.belongsTo(models.goods, {
    foreignKey: 'name',
    targetKey: 'name'
  })
  models.user_bag.belongsTo(models.goods, {
    foreignKey: 'name',
    targetKey: 'name'
  })
  models.user_buy_log.belongsTo(models.goods, {
    foreignKey: 'name',
    targetKey: 'name'
  })
  /**
   * ass
   */
  models.ass.belongsTo(models.ass_typing, {
    foreignKey: 'typing',
    targetKey: 'id'
  })
  models.ass_bag.belongsTo(models.goods, {
    foreignKey: 'name',
    targetKey: 'name'
  })
  models.ass_bag.belongsTo(models.goods, {
    foreignKey: 'name',
    targetKey: 'name'
  })
  models.ass_bag_message.belongsTo(models.ass, {
    foreignKey: 'aid',
    targetKey: 'id'
  })
  models.user_ass.belongsTo(models.ass, { foreignKey: 'aid', targetKey: 'id' })
  models.user_ass.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_ass_apply.belongsTo(models.ass, {
    foreignKey: 'aid',
    targetKey: 'id'
  })
  models.user_ass_apply.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })

  /**
   * group
   */
  models.user_group.belongsTo(models.user, {
    foreignKey: 'uid',
    targetKey: 'uid'
  })
  models.user_group_list.belongsTo(models.user_group, {
    foreignKey: 'gid',
    targetKey: 'id'
  })

  /**
   * front
   */

  models.good_front.belongsTo(models.goods, {
    foreignKey: 'gid',
    targetKey: 'id'
  })

  models.demon_front.belongsTo(models.demon, {
    foreignKey: 'did',
    targetKey: 'id'
  })

  models.demon_front.belongsTo(models.front, {
    foreignKey: 'fid',
    targetKey: 'id'
  })

  /**
   * world
   */
  models.world_front.belongsTo(models.world, {
    foreignKey: 'wid',
    targetKey: 'id'
  })

  models.world_front.belongsTo(models.front, {
    foreignKey: 'fid',
    targetKey: 'id'
  })
}
