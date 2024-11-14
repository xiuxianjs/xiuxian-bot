import ass_typing from './assets/sql/data/ass_typing.sql'
import levels_limit from './assets/sql/data/levels_limit.sql'
import levels from './assets/sql/data/levels.sql'
import constitution from './assets/sql/data/constitution.sql'
import fate_level from './assets/sql/data/fate_level.sql'
import goods_alliancemall from './assets/sql/data/goods_alliancemall.sql'
import goods_commodities from './assets/sql/data/goods_commodities.sql'
import goods_drops from './assets/sql/data/goods_drops.sql'
import { readFileSync } from 'fs'
import goods from './assets/sql/data/goods.sql'
import map_point from './assets/sql/data/map_point.sql'
import map_position from './assets/sql/data/map_position.sql'
import map_treasure from './assets/sql/data/map_treasure.sql'
import monster from './assets/sql/data/monster.sql'
import skys from './assets/sql/data/skys.sql'
import talent from './assets/sql/data/talent.sql'

const SqlMap = {
  constitution,
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
  map_treasure
}

import { models, sequelize, useBelongsTo } from './xiuxian/db'

// 在这里开始检查数据库
await sequelize
  .authenticate()
  .then(async () => {
    console.log('数据库连接成功.')
    // 得到当前数据库中的所有表
    // const tableExists = await sequelize.getQueryInterface().showAllTables()
    for (const key in models) {
      const model = models[key]
      await model.sync({ alter: true }).catch(err => {
        console.error(key, '表同步失败:', err)
      })
    }
    // SET FOREIGN_KEY_CHECKS = 0;
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    // 以当前本地文件为准
    for (const key in SqlMap) {
      const sql = readFileSync(SqlMap[key], 'utf8')
      const statements = sql.trim().split(';').filter(Boolean) // 拆分并过滤空语句
      const count = await models[key].count()
      if (statements.length > count) {
        // 删除重建
        for (const statement of statements) {
          const str = statement.trim()
          if (str.length > 0) {
            await sequelize.query(str)
          }
        }
        console.log('存在未加入数据,', key, '载入数据完成')
        return
      }
    }
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
    //
    console.log('数据库同步完成')
    // 建立索引
    useBelongsTo()
  })
  .catch(err => {
    console.error(err)
    console.log('数据库连接失败.')
    process.cwd()
  })
