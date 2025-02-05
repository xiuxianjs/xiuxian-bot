import { sequelize } from '@src/xiuxian/db/src/connect.js'
import {
  Attributes,
  FindOptions,
  ModelStatic,
  DataTypes,
  Model
} from 'sequelize'
import { front } from './front'
import { world } from './world'

/**
 * @description 秘境阵法关系
 * @author ningmengchongshui
 */

type ModelProps = {
  id: number
  name: string
  fid: number
  wid: number
  createdAt: Date
  updatedAt: Date
}

class world_front extends Model<ModelProps> {
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

world_front.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING(50),
    fid: {
      type: DataTypes.BIGINT,
      references: {
        model: front,
        key: 'id'
      }
    },
    wid: {
      type: DataTypes.BIGINT,
      references: {
        model: world,
        key: 'id'
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'world_front',
    freezeTableName: true,
    createdAt: true,
    updatedAt: true
  }
)

export { world_front }
