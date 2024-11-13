import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_sky_ranking = sequelize.define<
  Model<{
    // 定义模型属性
    id: number
    uid: string // string
    doc: string //
    updateAt: Date
  }>
>(
  'user_sky_ranking',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '通天塔'
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
      // onUpdate: DataTypes.NOW
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
