import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
import { Attributes, FindOptions, ModelStatic } from 'sequelize'
type ModelProps = {
  id: number
  type: number //int
  grade: number //int
  name: string //string
  doc: string
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

export const monster = sequelize.define(
  'monster',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    type: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '最低等级'
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    doc: {
      type: DataTypes.STRING(20),
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
