import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
export const constitution = sequelize.define<
  Model<{
    id: number
    name: string
    grade: number
  }>
>(
  'constitution',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    name: DataTypes.STRING,
    grade: DataTypes.INTEGER
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
