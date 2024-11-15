import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
type ModelProps = {
  id: number
  aid: number
  uid: string
}

class InitModel<T> extends Model<T> {}

export const user_ass_apply = sequelize.define<InitModel<ModelProps>>(
  'user_ass_apply',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    aid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    uid: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    indexes: [
      {
        name: 'user_ass_apply:pk:user:uid', // 索引名称
        unique: false, // 非唯一索引
        fields: ['uid'], // 索引字段
        using: 'BTREE' // 索引方法
      },
      {
        name: 'user_ass_apply:pk:ass:aid', // 索引名称
        unique: false, // 非唯一索引
        fields: ['aid'], // 索引字段
        using: 'BTREE' // 索引方法
      }
    ]
  }
)
