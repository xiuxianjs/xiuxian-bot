import { user } from '@xiuxian/db/index'

/**
 * 得到用户名称
 * @param UID
 * @returns
 */
export async function getUserName(UID: string) {
  const data = await user.findOneValue({
    where: {
      uid: UID
    }
  })
  return data.name
}
