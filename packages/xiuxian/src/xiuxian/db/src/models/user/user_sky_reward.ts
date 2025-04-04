import { sequelize } from '@src/xiuxian/db/src/connect.js'
import {
  Attributes,
  FindOptions,
  ModelStatic,
  DataTypes,
  Model
} from 'sequelize'
import { user } from './user.js'

class user_sky_reward extends Model<ModelProps> {
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
  // 定义模型属性
  id: number
  uid: string // string
  sid: number //
  time: Date
  createAt: Date
  updateAt: Date
  // deleteAt: Date
}
user_sky_reward.init(
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
    sid: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '奖励编号'
    },
    time: {
      type: DataTypes.DATE,
      comment: '本次记录'
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
    tableName: 'user_sky_reward',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)

export { user_sky_reward }
