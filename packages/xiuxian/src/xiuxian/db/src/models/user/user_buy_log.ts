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
  uid: string
  name: string
  count: number
  buy_time: Date
  createAt: Date
  updateAt: Date
  // deleteAt: Date
}

class user_buy_log extends Model<ModelProps> {
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
user_buy_log.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      references: {
        model: user,
        key: 'uid'
      }
    },
    name: {
      type: DataTypes.STRING,
      references: {
        model: goods,
        key: 'name'
      }
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    buy_time: {
      type: DataTypes.DATE
    },
    createAt: {
      type: DataTypes.DATE
    },
    updateAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
      // onUpdate: DataTypes.NOW
    }
    // deleteAt: {
    //   type: DataTypes.DATE
    // }
  },
  {
    sequelize,
    tableName: 'user_buy_log',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)

export { user_buy_log }
