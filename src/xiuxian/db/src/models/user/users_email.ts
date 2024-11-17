import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
import { Attributes, FindOptions, ModelStatic } from 'sequelize'

type ModelProps = {
  id: number
  uid: string
  email: string
  password: string
  identity: number
}

class users_email extends Model<ModelProps> {
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

users_email.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '编号'
    },
    uid: {
      type: DataTypes.STRING(50),
      comment: '用户id'
    },
    email: {
      type: DataTypes.STRING(255),
      comment: '邮箱'
    },
    password: {
      type: DataTypes.STRING(255),
      comment: '密码',
      defaultValue: ''
    },
    identity: {
      type: DataTypes.INTEGER,
      comment: '身份',
      defaultValue: 9
    }
  },
  {
    sequelize,
    tableName: 'users_email',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)

export { users_email }
