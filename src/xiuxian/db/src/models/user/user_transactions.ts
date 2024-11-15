import { sequelize, Model } from '../../connect.js'
import { DataTypes } from 'sequelize'
import { goods } from '../goods.js'
import { user } from './user.js'

type ModelProps = {
  id: number
  uid: string //string
  name: string //string
  count: number
  price: number
  createAt: Date
  updateAt: Date
  deleteAt: Date
}

class InitModel<T> extends Model<T> {}

export const user_transactions = sequelize.define<InitModel<ModelProps>>(
  'user_transactions',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      comment: '用户编号',
      references: {
        model: user,
        key: 'uid'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      comment: '物品名',
      references: {
        model: goods,
        key: 'name'
      }
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '物品数量'
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
    },
    createAt: {
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
