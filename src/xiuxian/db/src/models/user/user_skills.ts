import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_skills = sequelize.define<
  Model<{
    id: number
    uid: string // 编号
    name: string // 功法名
    doc: string // 说明
    updateAt: Date
  }>
>(
  'user_skills',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '玩家编号'
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '功法名'
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
        name: 'user_skills:pk:goods:name', // 索引名称
        unique: false, // 非唯一索引
        fields: ['name'], // 索引字段
        using: 'BTREE' // 索引方法
      }
    ]
  }
)
