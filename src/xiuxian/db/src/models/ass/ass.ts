import { sequelize } from '../../connect.js'
import {
  DataTypes,
  Model,
  Attributes,
  FindOptions,
  ModelStatic
} from 'sequelize'
import { ass_typing } from '../ass_typing.js'

type ModelProps = {
  id: number
  create_time: number
  name: string
  typing: number
  grade: number
  bag_grade: number
  property: number
  fame: number
  activation: number
  doc: string
}

class ass extends Model<ModelProps> {
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

ass.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    create_time: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '创建时间'
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    typing: {
      type: DataTypes.INTEGER,
      comment: '类型, 不同的类型文本不同',
      references: {
        model: ass_typing,
        key: 'id'
      }
    },
    grade: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '等级, 限制人数'
    },
    bag_grade: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '藏宝阁等级'
    },
    property: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: '灵石'
    },
    fame: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '名气'
    },
    activation: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '活跃度'
    },
    doc: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '说明'
    }
  },
  {
    sequelize,
    tableName: 'ass',
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

export { ass }
