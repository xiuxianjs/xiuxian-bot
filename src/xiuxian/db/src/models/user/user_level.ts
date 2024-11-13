import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
export const user_level = sequelize.define<
  Model<{
    id: number
    uid: string // 编号
    type: 1 | 2 | 3 // 境界类型
    career: number // 职业类型
    addition: number // 突破概率加成
    realm: number // 等级
    experience: number // 经验
    doc: string // 说明
    updateAt: Date
  }>
>(
  'user_level',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '境界类型'
    },
    career: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '职业类型,非职业为0'
    },
    addition: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '突破概率加成'
    },
    realm: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '等级'
    },
    experience: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '经验'
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
    updatedAt: false
  }
)
