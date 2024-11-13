import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'

export const user_transactions_logs = sequelize.define<
  Model<{
    id: number
    uid: string //string
    name: string //string
    count: number
    price: number
    createAt: Date
    updateAt: Date
    deleteAt: Date
  }>
>(
  'user_transactions_logs',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '用户编号'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '物品名'
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
    updatedAt: false,
    indexes: [
      {
        name: 'user_transactions_logs:pk:user:uid', // 索引名称
        unique: false, // 非唯一索引
        fields: ['uid'], // 索引字段
        using: 'BTREE' // 索引方法
      },
      {
        name: 'user_transactions_logs:pk:goods:name', // 索引名称
        unique: false, // 非唯一索引
        fields: ['name'], // 索引字段
        using: 'BTREE' // 索引方法
      }
    ]
  }
)
