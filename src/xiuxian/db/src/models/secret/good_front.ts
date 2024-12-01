import { sequelize } from '@src/xiuxian/db/src/connect.js'
import {
  Attributes,
  FindOptions,
  ModelStatic,
  DataTypes,
  Model
} from 'sequelize'
import { front } from './front'
import { goods } from '../goods'

/**
 * @description 怪物阵法关系
 * @author ningmengchongshui
 */

type ModelProps = {
  id: number
  name: string
  gid: number
  fid: number
  createdAt: Date
  updatedAt: Date
}

class good_front extends Model<ModelProps> {
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

good_front.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    gid: {
      type: DataTypes.BIGINT,
      references: {
        model: goods,
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
    tableName: 'good_front',
    freezeTableName: true,
    createdAt: true,
    updatedAt: true
  }
)

export { good_front }
