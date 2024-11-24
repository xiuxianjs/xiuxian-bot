import { Redis } from '@xiuxian/db/index'
import { ReadiName } from '../config'

/**
 *
 * @param key
 * @returns
 */
export async function get(key: string | number) {
  return await Redis.get(`${ReadiName}:${key}:lace`)
}
/**
 *
 * @param key
 * @param val
 */
export function set(key: string | number, val: any) {
  Redis.set(`${ReadiName}:${key}:lace`, val)
}
/**
 *
 * @param key
 */
export function del(key: string | number) {
  Redis.del(`${ReadiName}:${key}:lace`)
}
