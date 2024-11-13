import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_ass_apply = sequelize.define<
  Model<{
    id: number
    aid: number
    uid: string
  }>
>(
  'user_ass_apply',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    aid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    uid: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    indexes: [
      {
        name: 'user_ass_apply:pk:user:uid', // 索引名称
        unique: false, // 非唯一索引
        fields: ['uid'], // 索引字段
        using: 'BTREE' // 索引方法
      },
      {
        name: 'user_ass_apply:pk:ass:aid', // 索引名称
        unique: false, // 非唯一索引
        fields: ['aid'], // 索引字段
        using: 'BTREE' // 索引方法
      }
    ]
  }
)
