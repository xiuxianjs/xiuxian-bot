import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
type ModelProps = {
  id: number
  name: string //string
  type: number //int
  acount: number //int
  attribute: number //int
  x: number //int
  y: number //int
  z: number //int
  doc: string //string
}

class InitModel<T> extends Model<T> {}

export const map_treasure = sequelize.define<InitModel<ModelProps>>(
  'map_treasure',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attribute: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    acount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    x: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    y: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    z: {
      type: DataTypes.BIGINT,
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
    updatedAt: false
  }
)
