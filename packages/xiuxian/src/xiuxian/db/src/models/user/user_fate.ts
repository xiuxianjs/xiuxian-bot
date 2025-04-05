import { sequelize } from '@src/xiuxian/db/src/connect.js'
import {
  Attributes,
  FindOptions,
  ModelStatic,
  DataTypes,
  Model
} from 'sequelize'
import { goods } from '../goods.js'
import { user } from './user.js'

type ModelProps = {
  id: number
  uid: string // 编号
  name: string // 装备名
  grade: number // 装备名
}

class user_fate extends Model<ModelProps> {
  /**
   * 找到所有数据
   * @param this
   * @param options
   * @returns
   */
  public static async findAllValues<M extends Model>(
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
  public static async findOneValue<M extends Model>(
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
  public static async findOneRandomValue<M extends Model>(
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
user_fate.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '本命数据'
    },
    uid: {
      type: DataTypes.STRING(50),
      comment: '编号',
      references: {
        model: user,
        key: 'uid'
      }
    },
    name: {
      type: DataTypes.STRING(20),
      comment: '物品名',
      references: {
        model: goods,
        key: 'name'
      }
    },
    grade: {
      type: DataTypes.BIGINT, // 使用 BIGINT 以匹配 int(20)
      allowNull: true,
      comment: '等级'
    }
  },
  {
    sequelize,
    tableName: 'user_fate',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)

export { user_fate }
