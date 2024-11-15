import { Model, sequelize } from '../../connect.js'
import { DataTypes } from 'sequelize'
import { ass } from './ass.js'
import { goods } from '../goods.js'

type ModelProps = {
  id: number
  aid: number // 编号
  tid: number // 物品编号
  type: number // 物品类型
  name: string // 物品名
  acount: number // 数量
  doc: number // 说明
}

class InitModel<T> extends Model<T> {}

export const ass_bag = InitModel.init<
  typeof Model<ModelProps>,
  Model<ModelProps>
>(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    aid: {
      type: DataTypes.BIGINT,
      comment: '编号',
      references: {
        model: ass,
        key: 'id'
      }
    },
    tid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '物品编号'
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '物品类型'
    },
    name: {
      type: DataTypes.STRING(20),
      defaultValue: '10',
      comment: '物品名',
      references: {
        model: goods,
        key: 'name'
      }
    },
    acount: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      comment: '数量'
    },
    doc: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '说明'
    }
  },
  {
    sequelize,
    tableName: 'ass_bag',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
