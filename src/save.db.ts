/**
 * *****
 * 保存指定表的数据到本地
 * *****
 */
import { dirname, join } from 'path'
import { sequelize, useBelongsTo, models } from './xiuxian/db'
import { mkdirSync, writeFileSync } from 'fs'
const tableName = 'levels'
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

  // 开始保存数据
  if (models[tableName]) {
    const dir = join(process.cwd(), 'public', tableName + '.json')
    mkdirSync(dirname(dir), { recursive: true })
    const levels = await models[tableName]
      .findAll()
      .then(res => res.map(item => item.dataValues))
    writeFileSync(dir, JSON.stringify(levels), 'utf-8')
  }
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
