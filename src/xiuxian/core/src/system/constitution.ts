import { constitution, sequelize } from '@src/xiuxian/db'
/**
 *
 * @returns
 */
export const getRandomConstitutionOnId = async () => {
  return await constitution
    .findOne({
      order: sequelize.literal('RAND()') // MySQL 的随机排序
    })
    .then(res => res?.dataValues)
    .then(res => res.id)
}
