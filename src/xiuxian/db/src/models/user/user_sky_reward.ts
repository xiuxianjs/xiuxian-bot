import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_sky_reward = sequelize.define<
  Model<{
    // 定义模型属性
    id: number
    uid: string // string
    sid: number //
    time: Date
    createAt: Date
    updateAt: Date
    deleteAt: Date
  }>
>(
  'user_sky_reward',
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
    sid: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '奖励编号'
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '本次记录'
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
        name: 'user_sky_reward:pk:user:uid', // 索引名称
        unique: false, // 非唯一索引
        fields: ['uid'], // 索引字段
        using: 'BTREE' // 索引方法
      },
      {
        name: 'user_sky_reward:pk:skys:sid', // 索引名称
        unique: false, // 非唯一索引
        fields: ['sid'], // 索引字段
        using: 'BTREE' // 索引方法
      }
    ]
  }
)
