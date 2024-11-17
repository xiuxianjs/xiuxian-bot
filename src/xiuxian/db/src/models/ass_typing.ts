import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
import { Attributes, FindOptions, ModelStatic } from 'sequelize'

type ModelProps = {
  id: number
  master: string
  vice_master: string
  super_admin: string
  admin: string
  core_member: string
  senior_menber: string
  intermediate_member: string
  lowerlevel_member: string
  tagged_member: string
  reviewed_member: string
}

class ass_typing extends Model<ModelProps> {
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
ass_typing.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    master: {
      type: DataTypes.STRING(255),
      comment: '主人'
    },
    vice_master: {
      type: DataTypes.STRING(255),
      comment: '副主人'
    },
    super_admin: {
      type: DataTypes.STRING(255),
      comment: '超级管理员'
    },
    admin: {
      type: DataTypes.STRING(255),
      comment: '管理员'
    },
    core_member: {
      type: DataTypes.STRING(255),
      comment: '核心成员'
    },
    senior_menber: {
      type: DataTypes.STRING(255),
      comment: '高级成员'
    },
    intermediate_member: {
      type: DataTypes.STRING(255),
      comment: '中级成员'
    },
    lowerlevel_member: {
      type: DataTypes.STRING(255),
      comment: '低级成员'
    },
    tagged_member: {
      type: DataTypes.STRING(255),
      comment: '标记成员'
    },
    reviewed_member: {
      type: DataTypes.STRING(255),
      comment: '待审核成员'
    }
  },
  {
    sequelize,
    tableName: 'ass_typing',
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

export { ass_typing }
