import { sequelize, Model } from '../connect.js'
import { DataTypes } from 'sequelize'
type ModelProps = {
  id: number
  name: string //string
  doc: string //string
}

class InitModel<T> extends Model<T> {}

export const talent = sequelize.define<InitModel<ModelProps>>(
  'talent',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    doc: {
      type: DataTypes.STRING(20),
      allowNull: true
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
