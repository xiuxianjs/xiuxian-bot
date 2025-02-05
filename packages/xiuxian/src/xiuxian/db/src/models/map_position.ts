import { sequelize } from '@src/xiuxian/db/src/connect.js'
import {
  Attributes,
  FindOptions,
  ModelStatic,
  DataTypes,
  Model
} from 'sequelize'
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

class map_position extends Model<ModelProps> {
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
map_position.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20)
    },
    type: {
      type: DataTypes.INTEGER
    },
    grade: {
      type: DataTypes.INTEGER
    },
    attribute: {
      type: DataTypes.INTEGER
    },
    size: {
      type: DataTypes.INTEGER
    },
    x1: {
      type: DataTypes.INTEGER
    },
    x2: {
      type: DataTypes.INTEGER
    },
    y1: {
      type: DataTypes.INTEGER
    },
    y2: {
      type: DataTypes.INTEGER
    },
    z1: {
      type: DataTypes.INTEGER
    },
    z2: {
      type: DataTypes.INTEGER
    },
    doc: {
      type: DataTypes.STRING(20)
    }
  },
  {
    sequelize,
    tableName: 'map_position',
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

export { map_position }
