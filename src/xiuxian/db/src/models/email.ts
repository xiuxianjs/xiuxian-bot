import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
export const email = sequelize.define<
  Model<{
    id: number
    email: string
    uid: string
  }>
>(
  'email',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    email: DataTypes.STRING,
    uid: DataTypes.STRING
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
