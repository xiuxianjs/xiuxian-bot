import { sequelize } from '@src/xiuxian/db/src/connect.js'
import {
  Attributes,
  FindOptions,
  ModelStatic,
  DataTypes,
  Model
} from 'sequelize'
import { user } from './user.js'

type ModelProps = {
  id: number
  uid: string // string
  // doc: string //
  // updateAt: Date
}

class user_sky_ranking extends Model<ModelProps> {
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
user_sky_ranking.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '通天塔'
    },
    uid: {
      type: DataTypes.STRING(50),
      references: {
        model: user,
        key: 'uid'
      }
    }
    // updateAt: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW
    //   // onUpdate: DataTypes.NOW
    // },
    // doc: {
    //   type: DataTypes.STRING(20)
    // }
  },
  {
    sequelize,
    tableName: 'user_sky_ranking',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)

export { user_sky_ranking }
