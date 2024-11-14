import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'

export const map_position = sequelize.define<
  Model<{
    id: number
    name: string //string
    type: number //int
    grade: number //int
    attribute: number //int
    size: number
    x1: number //int
    x2: number //int
    y1: number //int
    y2: number //int
    z1: number //int
    z2: number //int
    doc: string //string
  }>
>(
  'map_position',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attribute: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    x1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    x2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    y1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    y2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    z1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    z2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    doc: {
      type: DataTypes.STRING(20)
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
