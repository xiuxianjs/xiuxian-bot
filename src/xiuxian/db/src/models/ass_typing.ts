import { sequelize, Model } from '../connect.js'
import { DataTypes } from 'sequelize'

type ModelProps = {
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
}

class InitModel<T> extends Model<T> {}

export const ass_typing = InitModel.init<
  typeof Model<ModelProps>,
  Model<ModelProps>
>(
  {
    id: {
      type: DataTypes.BIGINT,
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
    }
  },
  {
    sequelize,
    tableName: 'ass_typing',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ['id']
      }
    ]
  }
)
