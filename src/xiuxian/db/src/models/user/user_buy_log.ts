import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_buy_log = sequelize.define<
  Model<{
    id: number
    uid: string
    name: string
    count: number
    buy_time: Date
    createAt: Date
    updateAt: Date
    deleteAt: Date
  }>
>(
  'user_buy_log',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
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
    updatedAt: false,
    indexes: [
      {
        name: 'user_buy_log:pk:goods:name', // 索引名称
        unique: false, // 非唯一索引
        fields: ['name'], // 索引字段
        using: 'BTREE' // 索引方法
      },
      {
        name: 'user_buy_log:pk:user:uid', // 索引名称
        unique: false, // 非唯一索引
        fields: ['uid'], // 索引字段
        using: 'BTREE' // 索引方法
      }
    ]
  }
)
