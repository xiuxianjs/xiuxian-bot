import { sequelize, Model } from '../../connect.js'
import { DataTypes } from 'sequelize'
import { goods } from '../goods.js'
import { user } from './user.js'

type ModelProps = {
  id: number
  uid: string // 编号
  name: string // 装备名
  updateAt: Date
  doc: string // 说明
}

class InitModel<T> extends Model<T> {}

export const user_equipment = sequelize.define<InitModel<ModelProps>>(
  'user_equipment',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: user,
        key: 'uid'
      }
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true,
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
