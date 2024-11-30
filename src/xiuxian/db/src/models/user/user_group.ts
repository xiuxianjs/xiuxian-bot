import { sequelize } from '@src/xiuxian/db/src/connect.js'
import {
  Attributes,
  FindOptions,
  ModelStatic,
  DataTypes,
  Model
} from 'sequelize'
import { user } from './user'

type ModelProps = {
  id: number
  // 队伍名
  name: string
  // 队伍锁
  lock: number
  // 队长
  uid: string
}

class user_group extends Model<ModelProps> {
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

user_group.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '组队列表'
    },
    name: {
      type: DataTypes.STRING(50),
      comment: '队长名'
    },
    lock: {
      type: DataTypes.BIGINT,
      comment: '是否开启申请',
      defaultValue: 1
    },
    uid: {
      type: DataTypes.STRING(50),
      comment: '编号',
      references: {
        model: user,
        key: 'uid'
      }
    }
  },
  {
    sequelize,
    tableName: 'user_group',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ['id']
      }
    ]
  }
)

export { user_group }
