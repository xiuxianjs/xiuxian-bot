import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
export const ass_typing = sequelize.define<
  Model<{
    id: number
    master: string
    vice_master: string
    super_admin: string
    admin: string
    core_member: string
    senior_menber: string
    intermediate_member: string
    lowerlevel_member: string
    tagged_member: string
    reviewed_member: string
    doc: string
  }>
>(
  'ass_typing',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    master: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '主人'
    },
    vice_master: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '副主人'
    },
    super_admin: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '超级管理员'
    },
    admin: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '管理员'
    },
    core_member: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '核心成员'
    },
    senior_menber: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '高级成员'
    },
    intermediate_member: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '中级成员'
    },
    lowerlevel_member: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '低级成员'
    },
    tagged_member: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '标记成员'
    },
    reviewed_member: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '待审核成员'
    },
    doc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '说明'
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
