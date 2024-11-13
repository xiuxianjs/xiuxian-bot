import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_bag_message = sequelize.define<
  Model<{
    id: number
    uid: string //编号
    grade: number // 背包等级_默认1
  }>
>(
  'user_bag_message',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    uid: DataTypes.STRING, //编号
    grade: DataTypes.INET // 背包等级_默认1
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
