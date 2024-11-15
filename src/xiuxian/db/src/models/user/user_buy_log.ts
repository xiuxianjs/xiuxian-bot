import { sequelize, Model } from '../../connect.js'
import { DataTypes } from 'sequelize'
import { goods } from '../goods.js'
import { user } from './user.js'
type ModelProps = {
  id: number
  uid: string
  name: string
  count: number
  buy_time: Date
  createAt: Date
  updateAt: Date
  deleteAt: Date
}

class InitModel<T> extends Model<T> {}

export const user_buy_log = sequelize.define<InitModel<ModelProps>>(
  'user_buy_log',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      references: {
        model: user,
        key: 'uid'
      }
    },
    name: {
      type: DataTypes.STRING,
      references: {
        model: goods,
        key: 'name'
      }
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    buy_time: {
      type: DataTypes.DATE,
      allowNull: true
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
