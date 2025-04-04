import {
  // map_point,
  user_level,
  levels,
  user,
  user_bag_message,
  users
} from '@xiuxian/db/index'
import * as Method from '../wrap/method.js'
import * as Talent from '../users/base/talent.js'
import { getRandomConstitutionOnId } from './constitution.js'

/**
 * 设置玩家
 * @param UID
 * @param UserAvatar
 * @returns
 */
export async function setPlayer(UID: string, UserAvatar?: string) {
  const gaspractice = await levels.findOneValue({
    where: {
      grade: 0,
      type: 1
    }
  })
  const bodypractice = await levels.findOneValue({
    where: {
      grade: 0,
      type: 2
    }
  })
  // const MapPointData = await map_point.findOneValue({
  //   where: {
  //     name: '天山'
  //   }
  // })
  const constitutionId = await getRandomConstitutionOnId()
  //
  const name = Method.randomArray([
    '甲',
    '乙',
    '丙',
    '丁',
    '戊',
    '己',
    '庚',
    '辛',
    '壬',
    '癸'
  ])
  const players = [
    // 创建基础信息
    await user.create({
      uid: UID,
      name: name, // 道号
      avatar: UserAvatar ?? '', // 头像地址
      newcomer: 1, // 默认关闭新人模式
      state: 0, // 用户状态_默认0
      state_start_time: 9999999999, // 状态开始时间
      state_end_time: 9999999999, // 状态结束时间
      age: 1, // 寿龄_默认1
      theme: 'dark', // 主题
      age_limit: 100, // 最高寿龄_默认100
      // point_type: MapPointData.type, // 地点类型_默认0
      // pont_attribute: MapPointData.attribute, // 地点属性_默认0
      // pont_x: MapPointData.x, // 地点x轴_默认0
      // pont_y: MapPointData.y, // 地点y轴_默认0
      // pont_z: MapPointData.z, // 地点z轴_默认0
      battle_blood_now: gaspractice.blood + bodypractice.blood, // 当前血量_默认0
      battle_blood_limit: gaspractice.blood + bodypractice.blood, // 血量上限_默认0
      // 计算战力
      battle_attack: 0, // 攻击_默认0
      battle_defense: 0, // 防御_默认0
      battle_speed: 0, // 敏捷_默认0
      battle_power: 0, // 战力_默认0
      talent: Talent.getTalent(), // 灵根
      constitution: constitutionId, // 体质ID
      create_time: Date.now() // 创建时间搓
    }),
    // 创建背包信息
    await user_bag_message.create({
      uid: UID,
      grade: 1
    }),
    // 创建境界信息1
    await user_level.bulkCreate([
      {
        uid: UID,
        type: 1,
        addition: 0,
        realm: 0,
        experience: 0
      },
      {
        uid: UID,
        type: 2,
        addition: 0,
        realm: 0,
        experience: 0
      },
      {
        uid: UID,
        type: 3,
        addition: 0,
        realm: 0,
        experience: 0
      }
    ])
  ]
  // 返回执行结果 ？
  return players
}

/**
 * 删除重建
 * @param UID
 * @param UserAvatar
 * @returns
 */
export async function updatePlayer(UID: string, UserAvatar?: string) {
  for (const key in users) {
    await users[key].destroy({
      where: {
        uid: UID
      }
    })
  }
  const res = setPlayer(UID, UserAvatar)
  return res
}
