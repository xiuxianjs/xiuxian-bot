import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
type ModelProps = {
  id: number
  name: string //string
  type: number //int
  grade: number //int
  attribute: number //int
  x: number //int
  y: number //int
  z: number //int
  doc: string //string
}

class InitModel<T> extends Model<T> {}

export const map_point = sequelize.define<InitModel<ModelProps>>(
  'map_point',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true // 根据需要设置为 true 或 false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attribute: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    x: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    y: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    z: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    doc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
