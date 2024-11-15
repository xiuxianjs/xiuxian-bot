import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
import { Attributes, FindOptions, ModelStatic } from 'sequelize'

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
  id: number
  email: string
  uid: string
}

export const users_email = sequelize.define(
  'users_email',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '编号'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '邮箱'
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '游戏id'
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
