import { constitution, sequelize } from '@src/xiuxian/db'
/**
 * 获取随机的体质
 * @returns
 */
export const getRandomConstitutionOnId = async () => {
  return await constitution
    .findOneValue({
      // MySQL 的随机排序
      order: sequelize.literal('RAND()')
    })
    .then(res => res.id)
}
