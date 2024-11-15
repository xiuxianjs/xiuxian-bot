import { sequelize, Model } from '../connect.js'
import { DataTypes } from 'sequelize'
type ModelProps = {
  id: number
  name: string // string
  count: number //
  ranking: number
  createAt: Date
  updateAt: Date
  deleteAt: Date
}

class InitModel<T> extends Model<T> {}

export const skys = sequelize.define<InitModel<ModelProps>>(
  'skys',
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
      references: {
        model: 'goods',
        key: 'name'
      }
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '数量'
    },
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '排名'
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
      // onUpdate: DataTypes.NOW
    },
    deleteAt: {
      type: DataTypes.DATE,
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
