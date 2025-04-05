import { sequelize } from '@src/xiuxian/db/src/connect.js'
import { DataTypes, Model } from 'sequelize'
import { ass } from './ass.js'
import { goods } from '../goods.js'

import { Attributes, FindOptions, ModelStatic } from 'sequelize'

type ModelProps = {
  id: number
  aid: number // 编号
  tid: number // 物品编号
  type: number // 物品类型
  name: string // 物品名
  count: number // 数量
}

class ass_bag extends Model<ModelProps> {
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
ass_bag.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,

      allowNull: false
    },
    aid: {
      type: DataTypes.BIGINT,
      comment: '编号',
      references: {
        model: ass,
        key: 'id'
      }
    },
    tid: {
      type: DataTypes.INTEGER,
      comment: '物品编号'
    },
    type: {
      type: DataTypes.INTEGER,
      comment: '物品类型'
    },
    name: {
      type: DataTypes.STRING(20),
      defaultValue: '10',
      comment: '物品名',
      references: {
        model: goods,
        key: 'name'
      }
    },
    count: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      comment: '数量'
    }
    // doc: {
    //   type: DataTypes.STRING(20),
    //   comment: '说明'
    // }
  },
  {
    sequelize,
    tableName: 'ass_bag',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)

export { ass_bag }
