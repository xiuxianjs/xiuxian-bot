import { sequelize, Model } from '../connect.js'
import { DataTypes } from 'sequelize'
type ModelProps = {
  id: number
  name: string //string
}

class InitModel<T> extends Model<T> {}

export const walled_city = sequelize.define<InitModel<ModelProps>>(
  'walled_city',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '城市名称'
    }
  },
  {
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
