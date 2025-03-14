import { sequelize } from '@src/xiuxian/db/src/connect.js'
import {
  Attributes,
  FindOptions,
  ModelStatic,
  DataTypes,
  Model
} from 'sequelize'

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

class goods extends Model<ModelProps> {
  /**
   * 找到所有数据
   * @param this
   * @param options
   * @returns
   */
  public static async findAllValues<M extends Model>(
    this: ModelStatic<M>,
    options?: FindOptions<Attributes<M>>
  ): Promise<Attributes<M>[]> {
    return this.findAll({
      ...options,
      raw: true
    })
  }

  /**
   * 找到一条数据
   * @param this
   * @param options
   * @returns
   */
  public static async findOneValue<M extends Model>(
    this: ModelStatic<M>,
    options?: FindOptions<Attributes<M>>
  ): Promise<Attributes<M>> {
    /**
     * 可以设置ioredis中间件
     * 把 optoins化为key。
     * 当存在 key的时候，读取缓存。
     * 这个缓存是本地的ioredis服务。
     * 并设置过期时间
     * 同时，每次重启应用时
     * 需要把缓存key清理掉。
     */
    return this.findOne({
      ...options,
      raw: true
    })
  }

  /**
   * 随机找到一条数据
   * @param this
   * @param options
   * @returns
   */
  public static async findOneRandomValue<M extends Model>(
    this: ModelStatic<M>,
    options?: FindOptions<Attributes<M>>
  ): Promise<Attributes<M>> {
    return this.findOne({
      ...options,
      order: sequelize.random(),
      raw: true
    })
  }
}

goods.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      primaryKey: true,
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
      comment: '属性'
    },
    boolere_covery: {
      type: DataTypes.INTEGER
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
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
      {
        unique: true,
        fields: ['name']
      }
    ]
  }
)

export { goods }
