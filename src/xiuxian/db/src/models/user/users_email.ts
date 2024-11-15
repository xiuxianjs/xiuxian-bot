import { sequelize, Model } from '../../connect.js'
import { DataTypes } from 'sequelize'

class InitModel<T> extends Model<T> {}

type ModelProps = {
  id: number
  email: string
  uid: string
}

export const users_email = sequelize.define<InitModel<ModelProps>>(
  'users_email',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '编号'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '邮箱'
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '游戏id'
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
