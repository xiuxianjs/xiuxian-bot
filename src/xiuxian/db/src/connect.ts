import { appendFile, mkdirSync } from 'fs'
import { join } from 'path'
import {
  Attributes,
  FindOptions,
  Model as SequelizeModel,
  ModelStatic,
  Sequelize
} from 'sequelize'
import { getConfig } from 'alemonjs'

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const dir = join(process.cwd(), 'logs', 'mysql-dc')
mkdirSync(dir, { recursive: true })

const logging = (sql: string) => {
  const TIME = new Date()
  const NOW = TIME.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
  appendFile(join(dir, `${formatDate(TIME)}.log`), `${NOW}\n${sql}\n`, err => {
    if (err) {
      console.error('Error writing to log file:', err)
    }
  })
  return false
}

const db = getConfig().value?.db

export const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  port: db.port,
  dialect: 'mysql',
  logging: logging
})

export class Model<T> extends SequelizeModel<T> {
  /**
   * 找到所有数据
   * @param this
   * @param options
   * @returns
   */
  public static async findAllValues<M extends SequelizeModel>(
    this: ModelStatic<M>,
    options?: FindOptions<Attributes<M>>
  ): Promise<Attributes<M>[]> {
    return this.findAll({
      ...options,
      raw: true
    })
  }

  /**
   * 找到一条数据
   * @param this
   * @param options
   * @returns
   */
  public static async findOneValue<M extends SequelizeModel>(
    this: ModelStatic<M>,
    options?: FindOptions<Attributes<M>>
  ): Promise<Attributes<M>> {
    return this.findOne({
      ...options,
      raw: true
    })
  }

  /**
   * 随机找到一条数据
   * @param this
   * @param options
   * @returns
   */
  public static async findOneRandomValue<M extends SequelizeModel>(
    this: ModelStatic<M>,
    options?: FindOptions<Attributes<M>>
  ): Promise<Attributes<M>> {
    return this.findOne({
      ...options,
      order: sequelize.random(),
      raw: true
    })
  }
}
