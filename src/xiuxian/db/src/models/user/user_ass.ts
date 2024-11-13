import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_ass = sequelize.define<
  Model<{
    id: number
    create_time: number
    uid: string
    aid: number
    authentication: number
    contribute: number
    identity: string
    doc: string
    signin: string
    updateAt: Date
  }>
>(
  'user_ass',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    create_time: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '加入时间'
    },
    uid: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    aid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    contribute: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '贡献'
    },
    authentication: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '鉴权'
    },
    identity: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '身份名'
    },
    signin: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '签到'
    },
    doc: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '关系表'
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
        name: 'user_ass:pk:user:uid', // 索引名称
        unique: false, // 非唯一索引
        fields: ['uid'], // 索引字段
        using: 'BTREE' // 索引方法
      },
      {
        name: 'user_ass:pk:ass:aid', // 索引名称
        unique: false, // 非唯一索引
        fields: ['aid'], // 索引字段
        using: 'BTREE' // 索引方法
      }
    ]
  }
)
