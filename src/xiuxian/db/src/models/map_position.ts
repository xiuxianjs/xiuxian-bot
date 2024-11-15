import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
import { Attributes, FindOptions, ModelStatic } from 'sequelize'
type ModelProps = {
  id: number
  name: string //string
  type: number //int
  grade: number //int
  attribute: number //int
  size: number
  x1: number //int
  x2: number //int
  y1: number //int
  y2: number //int
  z1: number //int
  z2: number //int
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

export const map_position = sequelize.define(
  'map_position',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
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
    size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    x1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    x2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    y1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    y2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    z1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    z2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    doc: {
      type: DataTypes.STRING(20)
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
