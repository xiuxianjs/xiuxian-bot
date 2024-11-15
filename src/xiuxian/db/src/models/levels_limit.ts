import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
type ModelProps = {
  id: number
  typing: number
  grade: number
  gids: string
}

class InitModel<T> extends Model<T> {}

export const levels_limit = sequelize.define<InitModel<ModelProps>>(
  'levels_limit',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    typing: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '境界类型'
    },
    grade: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '对应等级'
    },
    gids: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '需要的物品'
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
