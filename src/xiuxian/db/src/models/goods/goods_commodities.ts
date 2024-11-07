import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const goods_commodities = sequelize.define<
  Model<{
    // 定义模型属性
    id: number
    gid: number //int
    limit_buy: number // 购买上限
  }>
>(
  'goods_commodities',
  {
    // 定义模型属性
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    gid: DataTypes.INTEGER, // bigint
    limit_buy: DataTypes.INTEGER // 购买限制
  },
  {
    freezeTableName: true, //不增加复数表名
    createdAt: false, //去掉
    updatedAt: false //去掉
  }
)
