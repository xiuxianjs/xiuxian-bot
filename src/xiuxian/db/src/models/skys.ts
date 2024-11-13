import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
export const skys = sequelize.define<
  Model<{
    // 定义模型属性
    id: number
    name: string // string
    count: number //
    ranking: number
    createAt: Date
    updateAt: Date
    deleteAt: Date
  }>
>(
  'skys',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '数量'
    },
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '排名'
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
        name: 'skys:pk:goods:name', // 索引名称
        unique: false, // 非唯一索引
        fields: ['name'], // 索引字段
        using: 'BTREE' // 索引方法
      }
    ]
  }
)
