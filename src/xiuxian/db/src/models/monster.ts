import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'

export const monster = sequelize.define<
  Model<{
    id: number
    type: number //int
    grade: number //int
    name: string //string
    doc: string
  }>
>(
  'monster',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    type: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '最低等级'
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
