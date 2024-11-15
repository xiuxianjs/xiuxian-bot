import { sequelize, Model } from '../connect.js'
import { DataTypes } from 'sequelize'
type ModelProps = {
  id: number
  name: string //string
  need: number
}

class InitModel<T> extends Model<T> {}

export const npc = sequelize.define<InitModel<ModelProps>>(
  'npc',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255)
    },
    need: {
      type: DataTypes.INTEGER,
      defaultValue: 1
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
