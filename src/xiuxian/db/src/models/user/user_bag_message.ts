import { sequelize, Model } from '../../connect.js'
import { DataTypes } from 'sequelize'
import { user } from './user.js'

type ModelProps = {
  id: number
  uid: string //编号
  grade: number // 背包等级_默认1
}

class InitModel<T> extends Model<T> {}

export const user_bag_message = sequelize.define<InitModel<ModelProps>>(
  'user_bag_message',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '用户编号',
      references: {
        model: user,
        key: 'uid'
      }
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
