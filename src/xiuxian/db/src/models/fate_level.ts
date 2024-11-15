import { sequelize, Model } from '../connect.js'
import { DataTypes } from 'sequelize'

type ModelProps = {
  id: number
  grade: number //int
  exp_bodypractice: number //int
  exp_gaspractice: number //int
  exp_soul: number //int
  doc: string //string
}

class InitModel<T> extends Model<T> {}

export const fate_level = sequelize.define<InitModel<ModelProps>>(
  'fate_level',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '等级'
    },
    exp_gaspractice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '气修经验'
    },
    exp_bodypractice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '体修经验'
    },
    exp_soul: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '灵魂经验'
    },
    doc: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '说明'
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
