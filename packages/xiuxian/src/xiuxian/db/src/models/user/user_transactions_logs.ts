import { sequelize } from '@src/xiuxian/db/src/connect.js'
import {
  Attributes,
  FindOptions,
  ModelStatic,
  DataTypes,
  Model
} from 'sequelize'
import { user } from './user.js'
import { goods } from '../goods.js'

class user_transactions_logs extends Model<ModelProps> {
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

type ModelProps = {
  id: number
  uid: string //string
  name: string //string
  count: number
  price: number
  createAt: Date
  updateAt: Date
  // deleteAt: Date
}
user_transactions_logs.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      comment: '用户编号',
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
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '物品数量'
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    updateAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    createAt: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: 'user_transactions_logs',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)

export { user_transactions_logs }
