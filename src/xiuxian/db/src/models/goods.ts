import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'

export const goods = sequelize.define<
  Model<{
    // 定义模型属性
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
    drops: number // 怪物掉落
    alliancemall: number //  联盟商城
    commodities: number // 万宝楼
    wheeldisc: number // 命运转盘 tudo 废弃
    palace: number // 浩瀚宫调 tudo 废弃
    limit: number // 浩瀚宫调限定 tudo 废弃
    limit_buy: number // 购买上限 tudo 废弃
  }>
>(
  'goods',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
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
    wheeldisc: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '命运转盘----特殊物品'
    },
    commodities: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '万宝楼------基础物品'
    },
    alliancemall: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '联盟商城------稀有物品'
    },
    palace: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '日常物品'
    },
    limit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '限定物品---1为普通 2为版本|绝版 3为极品'
    },
    drops: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '怪物掉落：材料'
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
      comment: '气境'
    },
    exp_bodypractice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '体境'
    },
    exp_soul: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '魂境'
    },
    size: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
    },
    limit_buy: {
      type: DataTypes.INTEGER,
      defaultValue: 99999,
      comment: '购买限制'
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
