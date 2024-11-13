import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_equipment = sequelize.define<
  Model<{
    id: number
    uid: string // 编号
    name: string // 装备名
    updateAt: Date
    doc: string // 说明
  }>
>(
  'user_equipment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
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
    updatedAt: false,
    indexes: [
      {
        name: 'user_equipment:pk:goods:name', // 索引名称
        unique: false, // 非唯一索引
        fields: ['name'], // 索引字段
        using: 'BTREE' // 索引方法
      }
    ]
  }
)
