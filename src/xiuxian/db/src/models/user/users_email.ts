import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const users_email = sequelize.define<
  Model<{
    id: number
    email: string
    uid: string
  }>
>(
  'users_email',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '编号'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '邮箱'
    },
    uid: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '游戏id'
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
