import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'

export const user_transactions = sequelize.define<
  Model<{
    id: number
    uid: string //string
    name: string //string
    count: number
    price: number
    createAt: Date
    updateAt: Date
    deleteAt: Date
  }>
>(
  'user_transactions',
  {
    id: {
      type: DataTypes.INTEGER, // integer
      primaryKey: true,
      unique: true
    },
    uid: DataTypes.STRING, //string
    name: DataTypes.STRING, //string
    count: DataTypes.INTEGER,
    price: DataTypes.INTEGER, // integer
    createAt: DataTypes.DATE,
    updateAt: DataTypes.DATE,
    deleteAt: DataTypes.DATE
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
