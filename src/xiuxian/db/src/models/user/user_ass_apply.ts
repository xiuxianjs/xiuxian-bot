import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_ass_apply = sequelize.define<
  Model<{
    id: number
    aid: number
    uid: string
  }>
>(
  'user_ass_apply',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    aid: DataTypes.INTEGER,
    uid: DataTypes.STRING
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
