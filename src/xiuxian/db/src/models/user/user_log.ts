import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_log = sequelize.define<
  Model<{
    id: number
    uid: string
    type: number
    create_time: number
    message: string
    doc: string
  }>
>(
  'user_log',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    uid: DataTypes.STRING,
    type: DataTypes.INET,
    create_time: DataTypes.BIGINT,
    message: DataTypes.STRING,
    doc: DataTypes.STRING
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
