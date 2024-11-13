import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
export const levels_limit = sequelize.define<
  Model<{
    id: number
    grade: number
    gids: string
  }>
>(
  'levels_limit',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    grade: DataTypes.INTEGER, //int
    gids: DataTypes.STRING //string
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
