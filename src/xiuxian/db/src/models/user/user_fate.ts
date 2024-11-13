import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_fate = sequelize.define<
  Model<{
    id: number
    uid: string // 编号
    name: string // 装备名
    grade: number // 装备名
    doc: string // 说明
    update: Date
  }>
>(
  'user_fate',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '本命数据'
    },
    uid: {
      type: DataTypes.BLOB, // 使用 BLOB 以支持 varbinary
      allowNull: false,
      comment: '编号'
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '物品名'
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
    updatedAt: false,
    indexes: [
      {
        name: 'user_fate:pk:goods:name', // 索引名称
        unique: false, // 非唯一索引
        fields: ['name'], // 索引字段
        using: 'BTREE' // 索引方法
      }
    ]
  }
)
