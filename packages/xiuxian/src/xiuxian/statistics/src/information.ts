import * as DB from '@xiuxian/db/index'
import { Op } from 'sequelize'
import { Talent, Equipment } from '@xiuxian/core/index'

/**
 * 我的资料
 * @param UID
 * @returns
 */
export async function personalInformation(UID: string) {
  const UserData = await DB.user.findOneValue({
    where: {
      uid: UID
    }
  })

  // 灵根名
  let size = '未知'
  let name = '未知'

  // 显示
  if (UserData?.talent_show == 1) {
    size = `+${Math.trunc(UserData.talent_size)}%`
    name = await Talent.getTalentName(UserData.talent)
  }

  // 固定数据读取
  const userLevelData = await DB.user_level.findAllValues({
    where: {
      uid: UID
    }
  })

  const gLevelData = userLevelData.find(item => item.type == 1)

  // 境界数据
  const GaspracticeList = await DB.levels.findAllValues({
    where: {
      grade: gLevelData?.realm ?? 0,
      type: 1
    }
  })

  const bLevelData = userLevelData.find(item => item.type == 2)

  // 境界数据
  const BodypracticeList = await DB.levels.findAllValues({
    where: {
      grade: bLevelData?.realm ?? 0,
      type: 2
    }
  })

  const sLevelData = userLevelData.find(item => item.type == 3)

  // 境界数据
  const SoulList = await DB.levels.findAllValues({
    where: {
      grade: sLevelData?.realm ?? 0,
      type: 3
    }
  })

  // 固定数据读取
  const GaspracticeData = GaspracticeList[0]
  const BodypracticeData = BodypracticeList[0]
  const SoulData = SoulList[0]

  const skills = await DB.user_skills.findAllValues({
    where: {
      uid: UID
    },
    include: {
      model: DB.goods
    }
  })

  //
  const equipment = await DB.user_equipment
    .findAll({
      where: {
        uid: UID
      },
      include: {
        model: DB.goods
      }
    })
    .then(res => res.map(item => item?.dataValues))

  const constitution_name = await DB.constitution
    .findOneValue({
      where: {
        id: UserData.constitution
      }
    })
    .then(res => res?.name)

  return {
    UID: UID,
    // 天赋
    linggenName: name,
    talentsize: size,
    talent_show: UserData.talent_show,
    talent: UserData.talent,
    special_reputation: UserData.special_reputation,
    battle_power: UserData.battle_power,
    // UserData
    name: UserData.name,
    battle_blood_now: UserData.battle_blood_now,
    battle_blood_limit: UserData.battle_blood_limit,
    age: UserData.age,
    age_limit: UserData.age_limit,
    autograph: UserData.autograph,
    special_spiritual: UserData.special_spiritual,
    special_spiritual_limit: UserData.special_spiritual_limit,
    special_prestige: UserData.special_prestige,
    immortal_grade: UserData.immortal_grade,
    constitution_name: constitution_name,
    // 境界信息
    level: {
      gaspractice: {
        Name: GaspracticeData?.name,
        Experience: gLevelData?.experience ?? 0,
        ExperienceLimit: GaspracticeData?.exp_needed
      },
      bodypractice: {
        Name: BodypracticeData?.name,
        Experience: bLevelData?.experience ?? 0,
        ExperienceLimit: BodypracticeData?.exp_needed
      },
      soul: {
        Name: SoulData?.name,
        Experience: sLevelData?.experience ?? 0,
        ExperienceLimit: SoulData?.exp_needed
      }
    },
    equipment: equipment,
    skills: skills,
    theme: UserData.theme
  }
}

export type PersonalInformationType =
  ReturnType<typeof personalInformation> extends Promise<infer T> ? T : never

/**
 * 装备信息
 * @param UID
 * @returns
 */
export async function equipmentInformation(UID: string) {
  // 得到用户数据
  const UserData = await DB.user.findOneValue({
    where: {
      uid: UID
    }
  })
  const equipment = await DB.user_equipment
    .findAll({
      where: {
        uid: UID
      },
      include: {
        model: DB.goods
      }
    })
    .then(res => res.map(item => item?.dataValues))

  const fdata = await DB.user_fate
    .findOne({
      where: {
        uid: UID
      },
      include: {
        model: DB.goods
      }
    })
    .then(res => res?.dataValues)

  const arr: {
    name: string
    grade: number
    attack: number
    defense: number
    blood: number
    critical_hit: number
    critical_damage: number
    speed: number
  }[] = []

  if (fdata) {
    arr.push({
      name: fdata.name,
      grade: fdata.grade,
      attack: Equipment.valculateNumerical(
        fdata['good']['dataValues']['attack'],
        fdata.grade
      ),
      defense: Equipment.valculateNumerical(
        fdata['good']['dataValues']['defense'],
        fdata.grade
      ),
      blood: Equipment.valculateNumerical(
        fdata['good']['dataValues']['blood'],
        fdata.grade
      ),
      critical_hit: Equipment.valculateNumerical(
        fdata['good']['dataValues']['critical_hit'],
        fdata.grade
      ),
      critical_damage: Equipment.valculateNumerical(
        fdata['good']['dataValues']['critical_damage'],
        fdata.grade
      ),
      speed: Equipment.valculateNumerical(
        fdata['good']['dataValues']['speed'],
        fdata.grade
      )
    })
  }

  return {
    UID,
    battle_power: UserData.battle_power,
    battle_attack: UserData.battle_attack,
    battle_defense: UserData.battle_defense,
    battle_blood_limit: UserData.battle_blood_limit,
    battle_speed: UserData.battle_speed,
    battle_critical_hit: UserData.battle_critical_hit,
    battle_critical_damage: UserData.battle_critical_damage,
    immortal_grade: UserData.immortal_grade,
    equipment: equipment,
    fate: arr
  }
}

export type EquipmentInformationType =
  ReturnType<typeof equipmentInformation> extends Promise<infer T> ? T : never

/**
 * 我的功法
 * @param UID
 * @returns
 */
export async function skillInformation(UID: string) {
  // 得到用户数据
  const UserData = await DB.user.findOneValue({
    where: {
      uid: UID
    }
  })
  // 灵根名
  let size = '未知'
  let name = '未知'
  if (UserData.talent_show == 1) {
    size = `+${Math.trunc(UserData.talent_size)}%`
    name = await Talent.getTalentName(UserData.talent)
  }
  const skills = await DB.user_skills
    .findAll({
      where: {
        uid: UID
      },
      include: [
        {
          model: DB.goods,
          where: {}
        }
      ]
    })
    .then(res => res.map(item => item?.dataValues))

  return {
    UID,
    skills: skills,
    name: UserData.name,
    linggenName: name,
    talentsize: size
  }
}

export type SkillInformationType =
  ReturnType<typeof skillInformation> extends Promise<infer T> ? T : never

/**
 * 储物袋
 * @param UID
 * @param type
 * @returns
 */
export async function backpackInformation(
  UID: string,
  type: number | number[]
) {
  // 得到用户数据
  const UserData = await DB.user.findOneValue({
    where: {
      uid: UID
    }
  })

  // 长度
  const length = await DB.user_bag.count({
    where: {
      uid: UID
    }
  })

  const bag = await DB.user_bag
    .findAll({
      where: {
        uid: UID
      },
      include: {
        model: DB.goods,
        where: {
          type: type
        }
      }
    })
    .then(res => res.map(item => item?.dataValues))

  // 背包信息
  const bag_message = await DB.user_bag_message
    .findOne({ where: { uid: UID } })
    .then(res => res?.dataValues)

  return {
    UID,
    name: UserData.name,
    bag_grade: bag_message?.grade ?? 0,
    length: length,
    bag: bag
  }
}

export type BackpackInformationType =
  ReturnType<typeof backpackInformation> extends Promise<infer T> ? T : never

/**
 * 呐戒
 * @param UID
 * @returns
 */
export async function ringInformation(UID: string) {
  const UserData = await DB.user.findOneValue({
    where: {
      uid: UID
    }
  })
  const length = await DB.user_ring.count({
    where: {
      uid: UID
    }
  })
  const bag = await DB.user_ring
    .findAll({
      where: {
        uid: UID
      },
      include: {
        model: DB.goods
      }
    })
    .then(res => res.map(item => item?.dataValues))
  return {
    UID,
    name: UserData?.name,
    bag_grade: 1,
    length: length ?? 0,
    bag: bag
  }
}

export type RingInformationType =
  ReturnType<typeof ringInformation> extends Promise<infer T> ? T : never

/**
 * 显示通天塔
 * @param UID
 * @returns
 */
export async function showSky(UID: string) {
  // 找到比自己id大  xxx的 4条数据。
  const data = await DB.user_sky_ranking.findOneValue({
    where: {
      uid: UID
    }
  })
  const list = await DB.user_sky_ranking.findAllValues({
    where: {
      id: { [Op.lte]: data.id } // 获取ID小于给定ID的记录
    },
    order: [['id', 'DESC']], // 根据 id 升序排序
    //
    limit: 5
  })
  const msg: {
    id: number
    UID: string
    name: string
    power: number
    autograph: string
    avatar: string
  }[] = []
  for (const item of list) {
    const data = await DB.user.findOneValue({
      where: {
        uid: item.uid
      }
    })
    if (!data) {
      // 不存在 uid
      DB.user_sky_ranking.destroy({
        where: {
          uid: item.uid
        }
      })
      continue
    }
    msg.unshift({
      id: item.id,
      UID: item.uid,
      name: data.name,
      power: data.battle_power,
      autograph: data.autograph,
      avatar: data.avatar
    })
  }
  return msg
}

export type ShowSkyType =
  ReturnType<typeof showSky> extends Promise<infer T> ? T : never
