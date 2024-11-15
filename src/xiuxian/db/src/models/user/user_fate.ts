import { sequelize, Model } from '../../connect.js'
import { DataTypes } from 'sequelize'
import { goods } from '../goods.js'
import { user } from './user.js'

type ModelProps = {
  id: number
  uid: string // 编号
  name: string // 装备名
  grade: number // 装备名
  doc: string // 说明
  update: Date
}

class InitModel<T> extends Model<T> {}

export const user_fate = sequelize.define<InitModel<ModelProps>>(
  'user_fate',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '本命数据'
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '编号',
      references: {
        model: user,
        key: 'uid'
      }
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '物品名',
      references: {
        model: goods,
        key: 'name'
      }
    },
    grade: {
      type: DataTypes.BIGINT, // 使用 BIGINT 以匹配 int(20)
      allowNull: true,
      comment: '等级'
    },
    doc: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '说明'
    },
    update: {
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
