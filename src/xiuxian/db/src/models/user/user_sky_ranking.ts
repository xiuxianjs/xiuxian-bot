import { sequelize, Model } from '../../connect.js'
import { DataTypes } from 'sequelize'
import { user } from './user.js'

type ModelProps = {
  id: number
  uid: string // string
  doc: string //
  updateAt: Date
}

class InitModel<T> extends Model<T> {}

export const user_sky_ranking = sequelize.define<InitModel<ModelProps>>(
  'user_sky_ranking',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '通天塔'
    },
    uid: {
      type: DataTypes.STRING(50),
      references: {
        model: user,
        key: 'uid'
      }
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
      // onUpdate: DataTypes.NOW
    },
    doc: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
