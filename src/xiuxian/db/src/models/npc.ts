import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
export const npc = sequelize.define<
  Model<{
    id: number
    name: string //string
    need: number
  }>
>(
  'npc',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255)
    },
    need: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
