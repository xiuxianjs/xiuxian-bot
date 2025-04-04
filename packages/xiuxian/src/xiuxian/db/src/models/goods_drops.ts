import { sequelize } from '@src/xiuxian/db/src/connect.js'
import {
  Attributes,
  FindOptions,
  ModelStatic,
  DataTypes,
  Model
} from 'sequelize'
import { goods } from './goods.js'

/**
 * @description 货物掉落
 */

type ModelProps = {
  id: number
  gid: number //int
  limit_buy: number // 购买上限
}

class goods_drops extends Model<ModelProps> {
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
goods_drops.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    gid: {
      type: DataTypes.BIGINT,
      comment: '商品编号',
      references: {
        model: goods,
        key: 'id'
      }
    },
    limit_buy: {
      type: DataTypes.BIGINT,
      comment: '购买限制'
    }
  },
  {
    sequelize,
    tableName: 'goods_drops',
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

export { goods_drops }
