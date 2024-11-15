import { sequelize, Model } from '../../connect.js'
import { DataTypes } from 'sequelize'
import { goods } from '../goods.js'
import { user } from './user.js'

type ModelProps = {
  id: number
  uid: string // 编号
  name: string // 功法名
  doc: string // 说明
  updateAt: Date
}

class InitModel<T> extends Model<T> {}

export const user_skills = sequelize.define<InitModel<ModelProps>>(
  'user_skills',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      comment: '玩家编号',
      references: {
        model: user,
        key: 'uid'
      }
    },
    name: {
      type: DataTypes.STRING(20),
      comment: '功法名',
      references: {
        model: goods,
        key: 'name'
      }
    },
    doc: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
      // onUpdate: DataTypes.NOW
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
