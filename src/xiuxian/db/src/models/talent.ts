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
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    doc: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
