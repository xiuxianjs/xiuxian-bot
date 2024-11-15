import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
import { Attributes, FindOptions, ModelStatic } from 'sequelize'

type ModelProps = {
  id: number
  grade: number //int
  exp_bodypractice: number //int
  exp_gaspractice: number //int
  exp_soul: number //int
  doc: string //string
}

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

export const fate_level = sequelize.define(
  'fate_level',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    },
    doc: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '说明'
    }
  },
  {
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
