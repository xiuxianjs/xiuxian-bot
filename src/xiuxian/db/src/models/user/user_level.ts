import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
import { Attributes, FindOptions, ModelStatic } from 'sequelize'
import { user } from './user.js'

type ModelProps = {
  id: number
  uid: string // 编号
  type: 1 | 2 | 3 // 境界类型
  career: number // 职业类型
  addition: number // 突破概率加成
  realm: number // 等级
  experience: number // 经验
  doc: string // 说明
  updateAt: Date
}

class user_level extends Model<ModelProps> {
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

user_level.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      references: {
        model: user,
        key: 'uid'
      }
    },
    type: {
      type: DataTypes.INTEGER,
      comment: '境界类型'
    },
    career: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '职业类型,非职业为0'
    },
    addition: {
      type: DataTypes.INTEGER,
      comment: '突破概率加成'
    },
    realm: {
      type: DataTypes.BIGINT,
      comment: '等级'
    },
    experience: {
      type: DataTypes.BIGINT,
      comment: '经验'
    },
    doc: {
      type: DataTypes.STRING(20),
      comment: '说明'
    },
    updateAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
      // onUpdate: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'user_level',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)

export { user_level }
