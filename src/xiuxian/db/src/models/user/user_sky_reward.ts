import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
import { Attributes, FindOptions, ModelStatic } from 'sequelize'
import { user } from './user.js'

class InitModel extends Model<ModelProps> {
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
  deleteAt: Date
}

export const user_sky_reward = sequelize.define(
  'user_sky_reward',
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
      allowNull: true,
      comment: '本次记录'
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
      // onUpdate: DataTypes.NOW
    },
    deleteAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
