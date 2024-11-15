import { sequelize, Model } from '../../connect.js'
import { DataTypes } from 'sequelize'
import { user } from './user.js'
import { ass } from '../ass/ass.js'
type ModelProps = {
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
}

class InitModel<T> extends Model<T> {}

export const user_ass = sequelize.define<InitModel<ModelProps>>(
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
      type: DataTypes.STRING(50),
      references: {
        model: user,
        key: 'uid'
      }
    },
    aid: {
      type: DataTypes.BIGINT,
      references: {
        model: ass,
        key: 'id'
      }
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
    updatedAt: false
  }
)
