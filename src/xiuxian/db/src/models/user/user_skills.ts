import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
import { Attributes, FindOptions, ModelStatic } from 'sequelize'
import { goods } from '../goods.js'
import { user } from './user.js'

type ModelProps = {
  id: number
  uid: string // 编号
  name: string // 功法名
  doc: string // 说明
  updateAt: Date
}

class user_skills extends Model<ModelProps> {
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

user_skills.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      comment: '玩家编号',
      references: {
        model: user,
        key: 'uid'
      }
    },
    name: {
      type: DataTypes.STRING(20),
      comment: '功法名',
      references: {
        model: goods,
        key: 'name'
      }
    },
    doc: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
      // onUpdate: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'user_skills',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)

export { user_skills }
