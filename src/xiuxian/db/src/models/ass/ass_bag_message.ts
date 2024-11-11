import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const ass_bag_message = sequelize.define<
  Model<{
    id: number
    aid: string
    grade: number
  }>
>(
  'ass_bag_message',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    aid: DataTypes.STRING,
    grade: DataTypes.INET
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
