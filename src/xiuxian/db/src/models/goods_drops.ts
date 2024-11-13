import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
export const goods_drops = sequelize.define<
  Model<{
    // 定义模型属性
    id: number
    gid: number //int
    limit_buy: number // 购买上限
  }>
>(
  'goods_drops',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    gid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '商品编号'
    },
    limit_buy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '购买限制'
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    indexes: [
      {
        name: 'goods_drops:pk:goods:gid', // 索引名称
        unique: false, // 非唯一索引
        fields: ['gid'], // 索引字段
        using: 'BTREE' // 索引方法
      }
    ]
  }
)
