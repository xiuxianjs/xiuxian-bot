import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_email = sequelize.define<
  Model<{
    id: number
    uid: string
    email: string
  }>
>(
  'user_email',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '平台uid'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '邮箱'
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
