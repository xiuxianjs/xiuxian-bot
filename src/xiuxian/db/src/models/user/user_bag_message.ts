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
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '用户编号'
    },
    grade: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '背包等级'
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
