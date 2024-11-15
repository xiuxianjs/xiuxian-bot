import { sequelize } from '../../connect.js'
import { DataTypes, Model } from 'sequelize'
// 定义User属性接口

interface User {
  id: number
  uid: string
  password: string
  name: string
  avatar: string
  autograph: string
  phone: number

  constitution: number
  immortal_grade: number
  immortal_constitution: number

  state: number
  state_start_time: number
  state_end_time: number
  theme: 'dark' | 'red' | 'blue' | 'purple'
  email: string
  age: number
  age_limit: number
  age_state: number
  point_type: number
  pont_attribute: number
  pont_x: number
  pont_y: number
  pont_z: number
  point_x: number
  point_y: number
  point_z: number
  battle_show: number
  battle_blood_now: number
  battle_blood_limit: number
  battle_attack: number
  battle_defense: number
  battle_speed: number
  battle_power: number
  battle_critical_hit: number
  battle_critical_damage: number
  special_reputation: number
  special_prestige: number
  special_spiritual: number
  special_spiritual_limit: number
  special_virtues: number
  talent: number[]
  talent_size: number
  talent_show: number
  bag_grade: number
  sign_day: number
  sign_math: number
  sign_size: number
  typing: number
  sign_time: number
  newcomer_gift: number
  point_attribute: number
  update_time: string
  create_time: number
  delete: number
  man_size: number
  dong_size: number
  dong_minit: number
  sign_in_count: number
  sign_in_month_count: number
  sign_in_time: Date
  doc: string
  deleteAt: Date
}

export const user = sequelize.define<Model<User>>(
  'user',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '编号'
    },
    create_time: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '创建时间'
    },
    update_time: {
      type: DataTypes.DATE(3),
      allowNull: true,
      comment: '更新时间'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '邮箱'
    },
    password: {
      type: DataTypes.STRING(25),
      defaultValue: '123456',
      comment: '密码'
    },
    name: {
      type: DataTypes.STRING(25),
      defaultValue: '空',
      comment: '姓名'
    },
    autograph: {
      type: DataTypes.STRING(100),
      defaultValue: '无',
      comment: '个性签名'
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '头像地址'
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: '手机号'
    },
    state: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '状态标记'
    },
    state_start_time: {
      type: DataTypes.BIGINT,
      defaultValue: 9999999999999,
      comment: '状态开始时间'
    },
    state_end_time: {
      type: DataTypes.BIGINT,
      defaultValue: 9999999999999,
      comment: '状态结束时间'
    },
    age: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      comment: '当前寿命'
    },
    theme: {
      type: DataTypes.STRING(255),
      defaultValue: 'dark',
      comment: '主题'
    },
    age_limit: {
      type: DataTypes.BIGINT,
      defaultValue: 100,
      comment: '寿命上限'
    },
    age_state: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      comment: '寿命状态'
    },
    point_type: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '地点编号'
    },
    pont_attribute: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '地点属性_默认0'
    },
    pont_x: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '地点x轴_默认0'
    },
    pont_y: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '地点y轴_默认0'
    },
    battle_show: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '是否现实战斗过程'
    },
    pont_z: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '地点z轴_默认0'
    },
    battle_blood_now: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '当前血量'
    },
    battle_blood_limit: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '血量上限'
    },
    battle_attack: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '攻击'
    },
    battle_defense: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '防御'
    },
    battle_speed: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '敏捷'
    },
    battle_power: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '战力'
    },
    battle_critical_hit: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '暴击率'
    },
    battle_critical_damage: {
      type: DataTypes.BIGINT,
      defaultValue: 50,
      comment: '暴击伤害'
    },
    special_reputation: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '声望'
    },
    special_prestige: {
      type: DataTypes.BIGINT,
      defaultValue: 30,
      comment: '煞气'
    },
    special_spiritual: {
      type: DataTypes.BIGINT,
      defaultValue: 100,
      comment: '灵力'
    },
    special_spiritual_limit: {
      type: DataTypes.BIGINT,
      defaultValue: 100,
      comment: '灵力上限'
    },
    special_virtues: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '功德'
    },
    talent: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: '灵根'
    },
    talent_size: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '天赋'
    },
    talent_show: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '是否显示灵根'
    },
    sign_day: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '签到天数'
    },
    sign_math: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      comment: '签到月'
    },
    sign_size: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      comment: '签到大小'
    },
    sign_time: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '签到时间'
    },
    bag_grade: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      comment: '背包等级'
    },
    newcomer_gift: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '是否是新人'
    },
    point_attribute: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '地点属性'
    },
    point_x: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '坐标'
    },
    point_y: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '坐标'
    },
    point_z: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '坐标'
    },
    doc: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '说明'
    },
    man_size: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '南天宫'
    },
    dong_size: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '东湖宫'
    },
    dong_minit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '东湖宫'
    },
    delete: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    sign_in_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '签到次数'
    },
    sign_in_month_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    sign_in_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    typing: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '类型'
    },
    deleteAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    constitution: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      comment: '体质'
    },
    immortal_grade: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      comment: '仙人等级'
    },
    immortal_constitution: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      comment: '仙骨'
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
