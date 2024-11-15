import { sequelize, Model } from '../connect.js'
import { DataTypes } from 'sequelize'
import { goods } from './goods.js'

type ModelProps = {
  // 定义模型属性
  id: number
  gid: number //int
  limit_buy: number // 购买上限
}

class InitModel<T> extends Model<T> {}

export const goods_alliancemall = sequelize.define<InitModel<ModelProps>>(
  'goods_alliancemall',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    gid: {
      type: DataTypes.INTEGER,
      comment: '商品编号',
      references: {
        model: goods,
        key: 'id'
      }
    },
    limit_buy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '购买限制'
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
