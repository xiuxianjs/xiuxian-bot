import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
import { Attributes, FindOptions, ModelStatic } from 'sequelize'
import { ass } from '../ass/ass.js'
import { user } from './user.js'
type ModelProps = {
  id: number
  aid: number
  uid: string
}

class user_ass_apply extends Model<ModelProps> {
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

user_ass_apply.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    aid: {
      type: DataTypes.BIGINT,
      references: {
        model: ass,
        key: 'id'
      }
    },
    uid: {
      type: DataTypes.STRING(50),
      references: {
        model: user,
        key: 'uid'
      }
    }
  },
  {
    sequelize,
    tableName: 'user_ass_apply',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)

export { user_ass_apply }
