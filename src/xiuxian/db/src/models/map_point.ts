import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
import { Attributes, FindOptions, ModelStatic } from 'sequelize'
type ModelProps = {
  id: number
  name: string //string
  type: number //int
  grade: number //int
  attribute: number //int
  x: number //int
  y: number //int
  z: number //int
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

export const map_point = sequelize.define(
  'map_point',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true // 根据需要设置为 true 或 false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attribute: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    x: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    y: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    z: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    doc: {
      type: DataTypes.STRING,
      allowNull: true
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
