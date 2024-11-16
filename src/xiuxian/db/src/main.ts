import * as models from './models.js'

export { models }

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
  models.user_email.belongsTo(models.user, {
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
}
