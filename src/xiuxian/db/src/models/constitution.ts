import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'

type ModelProps = {
  id: number
  name: string
  grade: number
}

class InitModel<T> extends Model<T> {}

export const constitution = sequelize.define<InitModel<ModelProps>>(
  'constitution',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '名称'
    },
    grade: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '等级'
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
