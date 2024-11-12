import { defineChildren } from 'alemonjs'
import { BaseModels, sequelize } from './xiuxian/db'
import { useBelongsTo } from './xiuxian/db/src/main'
import { readFileSync } from 'fs'
import xiuxian_sql from './assets/sql/xiuxian.sql'
import { SqlMap } from './sql'
/**
 * 如何才能修改每个版本的sql差异？
 */
export default defineChildren(() => {
  return {
    async onCreated() {
      // 整个模块被识别时
      console.info('修仙机器人启动')
      // 在这里开始检查数据库
      sequelize
        .authenticate()
        .then(async () => {
          console.log('数据库连接成功.')
          const tableExists = await sequelize
            .getQueryInterface()
            .showAllTables()
          // 不存在goods时。触发建表脚本
          if (!tableExists.includes('goods')) {
            // 读取并执行 SQL 文件
            const sql = readFileSync(xiuxian_sql, 'utf8')
            const statements = sql.split(';').filter(Boolean) // 拆分并过滤空语句
            for (const statement of statements) {
              console.log('statement', statement)
              await sequelize.query(statement.trim()) // 去除多余空格
            }
          }
          console.log('数据库表完成校验.')
          // 检查基础数据库是否有数据，没有数据开始插入数据
          for (const key in BaseModels) {
            const count = await BaseModels[key].count()
            // 没有数据。进行填充。
            if (count <= 0) {
              // 没有数据。进行数据插入
              const sql = readFileSync(SqlMap[key], 'utf8')
              const statements = sql.split(';').filter(Boolean) // 拆分并过滤空语句
              for (const statement of statements) {
                console.log('statement', statement)
                const str = statement.trim()
                if (str.length > 0) {
                  await sequelize.query(statement.trim()) // 去除多余空格
                }
              }
            }
          }
          console.log('数据库数据完成校验')
          useBelongsTo()
        })
        .catch(err => {
          console.error(err)
          console.log('数据库连接失败.')
          process.cwd()
        })
    }
  }
})
