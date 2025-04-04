import { sequelize } from '@src/xiuxian/db/src/connect.js'
import {
  Attributes,
  FindOptions,
  ModelStatic,
  DataTypes,
  Model
} from 'sequelize'
import { user } from './user.js'
import { ass } from '../ass/ass.js'
type ModelProps = {
  id: number
  create_time: number
  uid: string
  aid: number
  authentication: number
  contribute: number
  identity: string
  // doc: string
  signin: string
  // updateAt: Date
}

class user_ass extends Model<ModelProps> {
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

user_ass.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    create_time: {
      type: DataTypes.BIGINT,
      comment: '加入时间'
    },
    uid: {
      type: DataTypes.STRING(50),
      references: {
        model: user,
        key: 'uid'
      }
    },
    aid: {
      type: DataTypes.BIGINT,
      references: {
        model: ass,
        key: 'id'
      }
    },
    contribute: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '贡献'
    },
    authentication: {
      type: DataTypes.INTEGER,
      comment: '鉴权'
    },
    identity: {
      type: DataTypes.STRING(50),
      comment: '身份名'
    },
    signin: {
      type: DataTypes.BIGINT,
      comment: '签到'
    }
    // doc: {
    //   type: DataTypes.STRING(50),
    //   comment: '关系表'
    // }
    // updateAt: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW
    //   // onUpdate: DataTypes.NOW
    // }
  },
  {
    sequelize,
    tableName: 'user_ass',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)

export { user_ass }
