import { sequelize } from '@src/xiuxian/db/src/connect.js'
import {
  Attributes,
  FindOptions,
  ModelStatic,
  DataTypes,
  Model
} from 'sequelize'

/**
 * @description 等级表
 */

type ModelProps = {
  id: number
  grade: number //int
  exp_bodypractice: number //int
  exp_gaspractice: number //int
  exp_soul: number //int
}

class fate_level extends Model<ModelProps> {
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
fate_level.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    grade: {
      type: DataTypes.INTEGER,
      comment: '等级'
    },
    exp_gaspractice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '气修经验'
    },
    exp_bodypractice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '体修经验'
    },
    exp_soul: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '灵魂经验'
    }
  },
  {
    sequelize,
    tableName: 'fate_level',
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

export { fate_level }
