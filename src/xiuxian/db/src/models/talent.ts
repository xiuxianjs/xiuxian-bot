import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'

export const talent = sequelize.define<
  Model<{
    id: number
    name: string //string
    doc: string //string
  }>
>(
  'talent',
  {
    id: {
      type: DataTypes.INTEGER, // integer
      primaryKey: true,
      unique: true
    },
    name: DataTypes.STRING, //string
    doc: DataTypes.STRING //string
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
