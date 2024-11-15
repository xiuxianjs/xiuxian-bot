import { sequelize, Model } from '../../connect.js'
import { DataTypes } from 'sequelize'

class InitModel<T> extends Model<T> {}

type ModelProps = {
  // 定义模型属性
  id: number
  uid: string // string
  sid: number //
  time: Date
  createAt: Date
  updateAt: Date
  deleteAt: Date
}

export const user_sky_reward = sequelize.define<InitModel<ModelProps>>(
  'user_sky_reward',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sid: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '奖励编号'
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '本次记录'
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
      // onUpdate: DataTypes.NOW
    },
    deleteAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
