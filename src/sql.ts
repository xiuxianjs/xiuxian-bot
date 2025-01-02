// import goods from '@src/assets/db/goods.json'
// import goods_drops from '@src/assets/db/goods_drops.json'
// import goods_commodities from '@src/assets/db/goods_commodities.json'
// import goods_alliancemall from '@src/assets/db/goods_alliancemall.json'

// import levels from '@src/assets/db/levels.json'
// import levels_limit from '@src/assets/db/levels_limit.json'
// import fate_level from '@src/assets/db/fate_level.json'

// import map_point from '@src/assets/db/map_point.json'
// import map_position from '@src/assets/db/map_position.json'
// import map_treasure from '@src/assets/db/map_treasure.json'

// import ass_typing from '@src/assets/db/ass_typing.json'

// import monster from '@src/assets/db/monster.json'
// import skys from '@src/assets/db/skys.json'
// import talent from '@src/assets/db/talent.json'
// import constitution from '@src/assets/db/constitution.json'

// import { sequelize, models, useBelongsTo } from '@src/xiuxian/db'
import { sequelize, useBelongsTo } from '@src/xiuxian/db'

// const SqlData = {
//   goods,
//   goods_alliancemall,
//   goods_commodities,
//   goods_drops,
//   levels,
//   levels_limit,
//   fate_level,
//   ass_typing,
//   map_point,
//   map_position,
//   map_treasure,
//   constitution,
//   skys,
//   talent,
//   monster
// }

const sequelizeInit = async () => {
  console.log('数据库连接成功.')
  // 建立索引
  useBelongsTo()
  //
  await sequelize
    .sync({ alter: true })
    .then(() => {
      console.log('数据表同步完成.')
    })
    .catch(err => {
      console.error('表同步失败:', err)
    })
  // 插入数据
  // for (const key in models) {
  //   // 存在该数据
  //   if (SqlData[key]) {
  //     // 开始载入数据
  //     const promises = SqlData[key].map(data =>
  //       models[key].findOrCreate({
  //         where: { id: data.id }, // 查找条件
  //         defaults: data // 默认值
  //       })
  //     )
  //     await Promise.all(promises)
  //   }
  // }
  // console.log('数据载入完成.')
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
