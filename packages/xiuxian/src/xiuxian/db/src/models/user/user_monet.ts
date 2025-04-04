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
  //   tid: number // 物品编号
  grade: number // 物品类型
  name: string // 物品名
  count: number // 数量
  //   doc: number // 说明
  //   updateAt: Date
}

class user_ring extends Model<ModelProps> {
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

user_ring.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
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
      defaultValue: '10',
      comment: '物品名',
      references: {
        model: goods,
        key: 'name'
      }
    },
    grade: {
      // 下品、中品、上品、极品、仙品。
      type: DataTypes.INTEGER,
      comment: '物品等级'
    },
    count: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      comment: '数量'
    }
  },
  {
    sequelize,
    tableName: 'user_ring',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)

export { user_ring }
