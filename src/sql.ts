import { sequelize } from '@src/xiuxian/db'
import { useBelongsTo } from '@src/xiuxian/db/src/main'
import { readFileSync } from 'fs'
import ass_bag_message from './assets/sql/data/ass_bag_message.sql'
import ass_bag from './assets/sql/data/ass_bag.sql'
import ass from './assets/sql/data/ass.sql'
import ass_typing from './assets/sql/data/ass_typing.sql'
import levels_limit from './assets/sql/data/levels_limit.sql'
import levels from './assets/sql/data/levels.sql'
import constitution from './assets/sql/data/constitution.sql'
import fate_level from './assets/sql/data/fate_level.sql'
import goods_alliancemall from './assets/sql/data/goods_alliancemall.sql'
import goods_commodities from './assets/sql/data/goods_commodities.sql'
import goods_drops from './assets/sql/data/goods_drops.sql'
import goods from './assets/sql/data/goods.sql'
import map_point from './assets/sql/data/map_point.sql'
import map_position from './assets/sql/data/map_position.sql'
import map_treasure from './assets/sql/data/map_treasure.sql'
import monster from './assets/sql/data/monster.sql'
import skys from './assets/sql/data/skys.sql'
import talent from './assets/sql/data/talent.sql'
import user_ass_apply from './assets/sql/data/user_ass_apply.sql'
import user_ass from './assets/sql/data/user_ass.sql'
import user_bag_message from './assets/sql/data/user_bag_message.sql'
import user_bag from './assets/sql/data/user_bag.sql'
import user_buy_log from './assets/sql/data/user_buy_log.sql'
import user_email from './assets/sql/data/user_email.sql'
import user_equipment from './assets/sql/data/user_equipment.sql'
import user_fate from './assets/sql/data/user_fate.sql'
import user_level from './assets/sql/data/user_level.sql'
import user_log from './assets/sql/data/user_log.sql'
import user_ring from './assets/sql/data/user_ring.sql'
import user_skills from './assets/sql/data/user_skills.sql'
import user_sky_ranking from './assets/sql/data/user_sky_ranking.sql'
import user_sky_reward from './assets/sql/data/user_sky_reward.sql'
import user_skys from './assets/sql/data/user_skys.sql'
import user_transactions_logs from './assets/sql/data/user_transactions_logs.sql'
import user_transactions from './assets/sql/data/user_transactions.sql'
import user from './assets/sql/data/user.sql'
import users_email from './assets/sql/data/users_email.sql'
//
const SqlMap = {
  ass_bag_message,
  constitution,
  ass_bag,
  ass,
  ass_typing,
  levels_limit,
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
  user_ass_apply,
  user_ass,
  user_bag_message,
  user_bag,
  user_buy_log,
  user_email,
  user_equipment,
  user_fate,
  user_level,
  user_log,
  user_ring,
  user_skills,
  user_sky_ranking,
  user_sky_reward,
  user_skys,
  user_transactions_logs,
  user_transactions,
  user,
  users_email
  //
}

// 在这里开始检查数据库
await sequelize
  .authenticate()
  .then(async () => {
    console.log('数据库连接成功.')

    // 得到当前数据库中的所有表
    const tableExists = await sequelize.getQueryInterface().showAllTables()

    // 以当前本地文件为准
    for (const key in SqlMap) {
      // 不存在表
      if (!tableExists.includes(key)) {
        console.log('不存在', key, '开始载入数据')
        // 删除重建
        const sql = readFileSync(SqlMap[key], 'utf8')
        const statements = sql.split(';').filter(Boolean) // 拆分并过滤空语句
        for (const statement of statements) {
          const str = statement.trim()
          if (str.length > 0) {
            await sequelize.query(str)
          }
        }
        console.log('结束', key, '载入数据完成')
      }
    }
    //
    console.log('数据库数据完成校验')
    //
    useBelongsTo()
  })
  .catch(err => {
    console.error(err)
    console.log('数据库连接失败.')
    process.cwd()
  })
