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
  type: number //int
  grade: number //int
  name: string //string
  attack: number //int
  defense: number //int
  blood: number //int
  critical_hit: number //int
  critical_damage: number //int
  success_rate: number
  speed: number
  size: number
  soul: number
  exp_needed: number //int
  doc: string //string
}

class levels extends Model<ModelProps> {
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

levels.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER
    },
    grade: {
      type: DataTypes.BIGINT
    },
    name: {
      type: DataTypes.STRING(20)
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    blood: {
      type: DataTypes.INTEGER
    },
    critical_hit: {
      type: DataTypes.INTEGER,
      comment: '暴击率'
    },
    critical_damage: {
      type: DataTypes.INTEGER,
      comment: '暴击伤害'
    },
    speed: {
      type: DataTypes.INTEGER
    },
    size: {
      type: DataTypes.INTEGER
    },
    soul: {
      type: DataTypes.INTEGER
    },
    exp_needed: {
      type: DataTypes.INTEGER
    },
    success_rate: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      comment: '成功率'
    },
    doc: {
      type: DataTypes.STRING(20)
    }
  },
  {
    sequelize,
    tableName: 'levels',
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

export { levels }
