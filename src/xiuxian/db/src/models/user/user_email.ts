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
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    uid: DataTypes.STRING,
    email: DataTypes.STRING
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
