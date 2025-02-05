import { promisify } from 'util'

export const sleep = promisify(setTimeout)

/**
 * 随机一个元素
 * @param arr
 * @returns
 */
export function randomArray<T>(arr: T[]) {
  const randindex = Math.trunc(Math.random() * arr.length)
  return arr[randindex]
}

/**
 * 转换为字符
 * @param timestamp
 * @returns
 */
export function timeChange(timestamp: string | number | Date) {
  const date = new Date(timestamp)
  const M =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  return `${date.getFullYear()}-${M}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

/**
 * 暴击率
 * @param P
 * @returns
 */
export function isProbability(P: number) {
  if (P > 100) {
    return true
  }
  if (P < 0) return false
  // 随机数
  const rand = Math.floor(Math.random() * (100 - 1) + 1)
  if (P > rand) {
    return true
  }
  return false
}

/**
 * 概率获取器
 * @param min
 * @param max
 * @param percent
 * @returns
 */
export function isTrueInRange(min = 1, max = 100, percent = 0) {
  if (percent <= 0) {
    return false
  }
  if (percent >= 100) {
    return true
  }
  // 概率 percent越大 p越大
  const p = (percent / 100) * (max - min + 1) + min
  // 随机数[1,100] 取一个
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
  if (randomNum <= p) {
    return true
  }
  return false
}

/**
 * 时间格式化
 * @param time
 * @returns
 */
export function convertTime(time: number) {
  const ms = time % 1000
  time = (time - ms) / 1000
  const secs = time % 60
  time = (time - secs) / 60
  const mins = time % 60
  time = (time - mins) / 60
  const hrs = time % 24
  const days = (time - hrs) / 24
  return `${days}d${hrs}h${mins}m${secs}s`
}

// 判断是否是同一天
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

// 判断是否是同年同月
export const isSameYearAndMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  )
}
