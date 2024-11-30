import { mkdirSync } from 'fs'
import { join } from 'path'
import { Sequelize } from 'sequelize'
import { getConfig } from 'alemonjs'
import { logging } from './utils'
const dir = join(process.cwd(), 'logs', 'mysql')
mkdirSync(dir, { recursive: true })
const db = getConfig().value?.db
export const sequelize = new Sequelize(
  `mysql://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}`,
  {
    dialect: 'mysql',
    logging: logging
  }
)
