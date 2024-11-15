import { sequelize, Model } from '../../connect.js'
import { DataTypes } from 'sequelize'
import { ass } from '../ass/ass.js'
import { user } from './user.js'
type ModelProps = {
  id: number
  aid: number
  uid: string
}

class InitModel<T> extends Model<T> {}

export const user_ass_apply = sequelize.define<InitModel<ModelProps>>(
  'user_ass_apply',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    aid: {
      type: DataTypes.BIGINT,
      references: {
        model: ass,
        key: 'id'
      }
    },
    uid: {
      type: DataTypes.STRING(50),
      references: {
        model: user,
        key: 'uid'
      }
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
