import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_bag = sequelize.define<
  Model<{
    id: number
    uid: string // 编号
    tid: number // 物品编号
    type: number // 物品类型
    name: string // 物品名
    acount: number // 数量
    doc: number // 说明
    updateAt: Date
  }>
>(
  'user_bag',
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
      comment: '物品名'
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
      // onUpdate: DataTypes.NOW
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    indexes: [
      {
        name: 'user_bag:pk:goods:name', // 索引名称
        unique: false, // 非唯一索引
        fields: ['name'], // 索引字段
        using: 'BTREE' // 索引方法
      }
    ]
  }
)
