import { getIoRedis } from 'alemonjs'
import { user_email } from '@src/xiuxian/db'
/**
 * 根据user_key查询邮箱
 * @param uid
 * @returns
 */
export const getEmailUID = async (user_key: string) => {
  const ioRedis = getIoRedis()
  const key = `email:${user_key}`
  const email = await ioRedis.get(key)
  // 存在则返回
  if (email) return email
  // 不存在则查询
  return await user_email
    .findOneValue({
      where: {
        uid: user_key
      }
    })
    .then(data => {
      if (!data) return null
      if (!data.email) return null
      // 进行缓存
      ioRedis.set(key, data.email)
      return data.email
    })
}
