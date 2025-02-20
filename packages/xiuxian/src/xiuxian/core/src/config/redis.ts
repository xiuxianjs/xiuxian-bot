// 自定义冷却反馈
export const CD_MAP = {
  0: '攻击',
  1: '锻体',
  2: '闭关',
  3: '改名',
  4: '道宣',
  5: '赠送',
  6: '突破',
  7: '破体',
  8: '转世',
  9: '行为',
  10: '击杀',
  11: '决斗',
  12: '修行',
  13: '渡劫',
  14: '双修',
  15: '偷药',
  16: '占领矿场',
  17: '偷动物',
  18: '做饭',
  19: '顿悟',
  20: '决斗',
  21: '偷袭',
  22: '开采',
  23: '挑战',
  24: '打劫',
  25: '攻击BOSS'
}

export const ACTIONMAP = {
  0: '空闲',
  1: '闭关',
  2: '锻体',
  3: '赶路',
  4: '传送',
  5: '渡劫',
  6: '扩建',
  7: '秘境',
  8: '打坐'
}

export type StateKey = {
  // 闭关
  1: string
  2: string
  8: string
}

// redis前缀  xiuxian   app  维护 redis 不好找了
export const ReadiName = 'xiuxian-plugin'
export const RedisMonster = 'xiuxian:monsters5'
export const RedisExplore = 'xiuxian:explore6'
export const RedisBull = 'xiuxian:bull'
export const RedisBullAction = 'xiuxian:bull:Action'
