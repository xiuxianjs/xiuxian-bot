import { sequelize } from '@src/xiuxian/db/src/connect.js'
import {
  Attributes,
  FindOptions,
  ModelStatic,
  DataTypes,
  Model
} from 'sequelize'
import { front } from './front'
import { demon } from './demon'

/**
 * @description 怪物阵法关系
 * @author ningmengchongshui
 */

type ModelProps = {
  id: number
  name: string
  did: number
  fid: number
  createdAt: Date
  updatedAt: Date
}

class demon_front extends Model<ModelProps> {
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

demon_front.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    did: {
      type: DataTypes.BIGINT,
      references: {
        model: demon,
        key: 'id'
      }
    },
    fid: {
      type: DataTypes.BIGINT,
      references: {
        model: front,
        key: 'id'
      }
    },
    name: DataTypes.STRING(50),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'demon_front',
    freezeTableName: true,
    createdAt: true,
    updatedAt: true
  }
)

export { demon_front }
