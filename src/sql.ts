import { models, sequelize, useBelongsTo } from './xiuxian/db'
import ass_typing from './assets/db/ass_typing.json'
import levels_limit from './assets/db/levels_limit.json'
import levels from './assets/db/levels.json'
import constitution from './assets/db/constitution.json'
import fate_level from './assets/db/fate_level.json'
import goods_alliancemall from './assets/db/goods_alliancemall.json'
import goods_commodities from './assets/db/goods_commodities.json'
import goods_drops from './assets/db/goods_drops.json'
import goods from './assets/db/goods.json'
import map_point from './assets/db/map_point.json'
import map_position from './assets/db/map_position.json'
import map_treasure from './assets/db/map_treasure.json'
import monster from './assets/db/monster.json'
import skys from './assets/db/skys.json'
import talent from './assets/db/talent.json'
import { Model } from 'sequelize'

const SqlData = {
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

const sequelizeInit = async () => {
  console.log('数据库连接成功.')
  // 建立索引
  useBelongsTo()
  // 开始同步
  for (const key in models) {
    const model: typeof Model = models[key]
    await model.sync({ alter: true }).catch(err => {
      console.error('表同步失败:', key, err)
    })
  }
  // 插入数据
  for (const key in models) {
    if (SqlData[key]) {
      for (const data of SqlData[key]) {
        await models[key].findOrCreate({
          // 查找条件 id 不一致
          where: { id: data.id },
          // 如果找不到，则插入的默认值
          defaults: data
        })
      }
    }
  }
  console.log('数据库同步完成.')
}

// 在这里开始检查数据库
await sequelize
  .authenticate()
  .then(sequelizeInit)
  .catch(err => {
    console.error(err)
    console.log('数据库连接失败.')
    process.cwd()
  })
