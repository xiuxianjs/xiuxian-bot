import { sequelize, useBelongsTo } from '@src/xiuxian/db'

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
