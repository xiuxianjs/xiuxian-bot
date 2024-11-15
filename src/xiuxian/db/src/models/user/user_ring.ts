import { sequelize, Model } from '../../connect.js'
import { DataTypes } from 'sequelize'
import { goods } from '../goods.js'

type ModelProps = {
  id: number
  uid: string // 编号
  tid: number // 物品编号
  type: number // 物品类型
  name: string // 物品名
  acount: number // 数量
  doc: number // 说明
  updateAt: Date
}

class InitModel<T> extends Model<T> {}

export const user_ring = sequelize.define<InitModel<ModelProps>>(
  'user_ring',
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
      comment: '编号'
    },
    tid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '物品编号'
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '物品类型'
    },
    name: {
      type: DataTypes.STRING(20),
      defaultValue: '10',
      comment: '物品名',
      references: {
        model: goods,
        key: 'name'
      }
    },
    acount: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      comment: '数量'
    },
    doc: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '说明'
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
      // onUpdate: DataTypes.NOW,
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
