import { Text, useSend } from 'alemonjs'
import { isUser, victoryCooling } from '@xiuxian/api/index'
import {
  Burial,
  Cooling,
  Equipment,
  Levels,
  Method,
  operationLock
} from '@xiuxian/core/index'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { levels, user, user_level } from '@src/xiuxian/db'
import { NAMEMAP } from '@src/xiuxian/core/src/users/additional/levels'

// 突破
// 前期简单，后期困难。
// 渡劫期时需要渡过雷劫。
// 渡劫后，成就仙人境界。
// 如果是仙人境界，可修炼至33重天。修满即是大罗。

export default OnResponse(
  async e => {
    // lock start
    const T = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }

    const CDID = 6
    const ID = 1
    const p = 90
    const UID = await getEmailUID(e.UserId)

    // 校验
    const UserData = await isUser(e, UID)

    //
    if (typeof UserData === 'boolean') return

    // 冷却
    if (!(await victoryCooling(e, UID, CDID))) return

    const LevelMsg = await user_level
      .findOne({
        attributes: ['addition', 'realm', 'experience'],
        where: {
          uid: UID,
          type: ID
        }
      })
      .then(res => res?.dataValues)

    //
    if (LevelMsg.experience <= 100) {
      Send(Text('毫无自知之明'))
      return
    }

    // 取值范围 [1 100 ] 突破概率为 (68-realm)/100
    const number = LevelMsg.realm ?? 0

    if (!Method.isTrueInRange(1, 100, p - LevelMsg.realm + number)) {
      // 设置突破冷却
      Burial.set(UID, CDID, Cooling.CD_Level_up)
      /** 随机顺序损失经验  */
      const randomKey = Levels.getRandomKey()
      const size = Math.floor(LevelMsg.experience / (randomKey + 1))
      await Levels.reduceExperience(UID, ID, size)
      const msg = await Levels.getCopywriting(
        ID,
        randomKey,
        size > 999999 ? 999999 : size
      )
      Send(Text(msg))
      return
    }

    const UserLevel = await user_level
      .findOne({
        attributes: ['addition', 'realm', 'experience'],
        where: {
          uid: UID,
          type: ID
        }
      })
      .then(res => res?.dataValues)

    const realm = UserLevel.realm

    // 查看是否是渡劫
    const LevelListMax = await levels
      .findAll({
        attributes: ['id', 'exp_needed', 'grade', 'type', 'name'],
        where: {
          type: ID
        },
        order: [['grade', 'DESC']],
        limit: 3
      })
      .then(res => res.map(item => item?.dataValues))

    const data = LevelListMax[1]

    if (!data || UserLevel.realm == data.grade) {
      Send(Text(`道友已至瓶颈,唯寻得真理,方成大道`))
      return
    }

    // 查看下一个境界
    const LevelList = await levels
      .findAll({
        attributes: ['id', 'exp_needed', 'grade', 'type', 'name'],
        where: {
          type: ID,
          grade: [realm + 1, realm]
        },
        order: [['grade', 'DESC']],
        limit: 3
      })
      .then(res => res.map(item => item?.dataValues))

    const next = LevelList[0]
    const now = LevelList[1]
    if (!next || !now) {
      Send(Text('已看破天机'))
      return
    }
    // 判断经验够不够
    if (UserLevel.experience < now.exp_needed) {
      Send(Text(`${NAMEMAP[ID]}不足`))
      return
    }

    // 减少境界
    UserLevel.experience -= now.exp_needed
    // 调整境界
    UserLevel.realm += 1

    /***
     * 境界变动的时候更新
     */
    user.update(
      {
        special_spiritual_limit: 100 + UserLevel.realm
      },
      {
        where: {
          uid: UID
        }
      }
    )

    // 调整叠加
    UserLevel.addition = 0

    // 保存境界信息

    await user_level.update(UserLevel, {
      where: {
        type: ID,
        uid: UID
      }
    })

    Send(Text(`境界提升至${next.name}`))

    // 设置
    Burial.set(UID, CDID, Cooling.CD_Level_up)

    // 突破直接满血
    setTimeout(async () => {
      // 更新面板
      Equipment.updatePanel(UID, UserData.battle_blood_limit)
    }, 1500)

    //
  },
  'message.create',
  /^(#|\/)?突破$/
)
