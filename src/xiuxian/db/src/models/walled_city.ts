import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
type ModelProps = {
  id: number
  name: string //string
}

class InitModel<T> extends Model<T> {}

export const walled_city = sequelize.define<InitModel<ModelProps>>(
  'walled_city',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
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
    updatedAt: false
  }
)
