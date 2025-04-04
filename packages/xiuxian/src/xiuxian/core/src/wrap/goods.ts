/**
 * 转换函数集
 */
const map = {
  1: (item, name: string, size: number) => {
    return `[${item.name}]_攻击:${item.attack}%_${name}:${Math.floor(
      item.price * size
    )}`
  },
  2: (item, name: string, size: number) => {
    return `[${item.name}]_防御:${item.defense}%_${name}:${Math.floor(
      item.price * size
    )}`
  },
  3: (item, name: string, size: number) => {
    return `[${item.name}]_暴伤:${item.critical_damage}%_${name}:${Math.floor(
      item.price * size
    )}`
  },
  4: (item, name: string, size: number) => {
    if (item.addition == 'blood') {
      return `[${item.name}]_血量:${item.blood}%_${name}:${Math.floor(
        item.price * size
      )}`
    } else {
      return `[${item.name}]_修为:${
        item.exp_gaspractice
      }_${name}:${Math.floor(item.price * size)}`
    }
  },
  5: (item, name: string, size: number) => {
    return `[${item.name}]_天赋:${item.size}%_${name}:${Math.floor(
      item.price * size
    )}`
  },
  6: (item, name: string, size: number) => {
    return `[${item.name}]_类型:道具_${name}:${Math.floor(item.price * size)}`
  }
}

export const mapType = {
  武器: 1,
  护具: 2,
  法宝: 3,
  丹药: 4,
  功法: 5,
  道具: 6,
  材料: 7,
  装备: [1, 2, 3]
}

/**
 * 物品信息转换
 * @param list
 * @param param1
 * @returns
 */
export function getListMsg(
  list: {
    type: string
  }[],
  name = '灵石',
  size = 1
) {
  return list.map(item => map[item?.type](item, name, size))
}
