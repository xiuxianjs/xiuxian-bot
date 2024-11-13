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
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    aid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '宗门编号'
    },
    grade: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '背包等级'
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
