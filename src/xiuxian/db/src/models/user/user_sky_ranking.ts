import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_sky_ranking = sequelize.define<
  Model<{
    // 定义模型属性
    id: number
    uid: string // string
    doc: string //
  }>
>(
  'user_sky_ranking',
  {
    // 定义模型属性
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    uid: DataTypes.STRING, // string
    doc: DataTypes.STRING //
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
