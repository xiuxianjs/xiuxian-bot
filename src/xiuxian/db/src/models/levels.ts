import { sequelize } from '../connect.js'
import { DataTypes, Model } from 'sequelize'
export const levels = sequelize.define<
  Model<{
    id: number
    type: number //int
    grade: number //int
    name: string //string
    attack: number //int
    defense: number //int
    blood: number //int
    critical_hit: number //int
    critical_damage: number //int
    success_rate: number
    speed: number
    size: number
    soul: number
    exp_needed: number //int
    doc: string //string
  }>
>(
  'levels',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    grade: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    blood: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    critical_hit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '暴击率'
    },
    critical_damage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '暴击伤害'
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    soul: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    exp_needed: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    success_rate: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      comment: '成功率'
    },
    doc: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
