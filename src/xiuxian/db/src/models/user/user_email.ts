import { sequelize, Model } from '../../connect.js'
import { DataTypes } from 'sequelize'

type ModelProps = {
  id: number
  uid: string
  email: string
}

class InitModel<T> extends Model<T> {}

export const user_email = sequelize.define<InitModel<ModelProps>>(
  'user_email',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '平台uid'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '邮箱'
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
