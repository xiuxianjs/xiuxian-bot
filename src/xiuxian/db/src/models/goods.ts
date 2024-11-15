import { Model, sequelize } from '../connect.js'
import { DataTypes } from 'sequelize'

type ModelProps = {
  id: number
  type: number //int
  monster_type: number //int
  grade: number //int
  name: string //string
  addition: string
  talent: number[] // json
  attack: number
  defense: number
  blood: number
  boolere_covery: number
  critical_hit: number
  critical_damage: number
  exp_bodypractice: number
  exp_gaspractice: number
  exp_soul: number
  speed: number
  size: number
  price: number
}

class InitModel<T> extends Model<T> {}

export const goods = InitModel.init<
  typeof Model<ModelProps>,
  Model<ModelProps>
>(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: '名字唯一'
    },
    type: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '类型'
    },
    monster_type: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '怪物类型'
    },
    grade: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '物品种类等级'
    },
    addition: {
      type: DataTypes.STRING(20),
      defaultValue: 'blood',
      comment: '属性'
    },
    talent: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: '属性'
    },
    boolere_covery: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '攻击'
    },
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '防御'
    },
    blood: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '血量'
    },
    critical_hit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '暴击'
    },
    critical_damage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '暴伤'
    },
    exp_gaspractice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '气境增值'
    },
    exp_bodypractice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '体境增值'
    },
    exp_soul: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '魂境增值'
    },
    size: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: ''
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '敏捷'
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
      comment: '价格'
    }
  },
  {
    sequelize,
    tableName: 'goods',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
