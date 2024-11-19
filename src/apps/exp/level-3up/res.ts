import { Text, useSend } from 'alemonjs'
import { Equipment, Levels, Method, operationLock } from '@xiuxian/core/index'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { Attributes, levels, user, user_level } from '@src/xiuxian/db'
import { NAMEMAP } from '@src/xiuxian/core/src/users/additional/levels'
export default OnResponse(
  async e => {
    // lock start
    const T = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }

    const ID = 3

    const UID = await getEmailUID(e.UserId)

    // 校验
    const UserData = e['UserData'] as Attributes<typeof user>

    // 得到数据
    const UserLevel = await user_level
      .findOne({
        where: {
          uid: UID,
          type: ID
        }
      })
      .then(res => res?.dataValues)

    // 查看当前境界所在位置
    const LevelsData = await levels
      .findAll({
        where: {
          type: ID
        },
        // 排序
        order: [['grade', 'DESC']],
        limit: 3
      })
      .then(res => res.map(item => item?.dataValues))

    // 渡劫期数据
    const TribulationData = LevelsData[1]

    // 目前境界在渡劫期
    if (!TribulationData || UserLevel.realm == TribulationData.grade) {
      Send(Text(`道友已至瓶颈,唯寻得真理,方成大道`))
      return
    }

    if (UserLevel?.experience <= 100) {
      Send(Text('毫无自知之明'))
      return
    }

    const realm = UserLevel?.realm ?? 0

    // 现在的境界数据
    const nowLevel = await levels
      .findOne({
        where: {
          type: ID,
          grade: realm
        },
        // 按 grade 排序
        order: [['grade', 'DESC']],
        limit: 3
      })
      .then(res => res?.dataValues)

    // 判断经验够不够
    if (UserLevel.experience < nowLevel.exp_needed) {
      Send(Text(`${NAMEMAP[ID]}不足`))
      return
    }

    // 查看下一个境界
    const nextLevel = await levels
      .findOne({
        where: {
          type: ID,
          grade: realm + 1
        },
        // 按 grade 排序
        order: [['grade', 'DESC']],
        limit: 3
      })
      .then(res => res?.dataValues)

    const levelUp = async () => {
      const p = 70 - realm - UserData.immortal_grade * 3
      // 取值范围 [1 100 ] 突破概率为 (value-realm-grade)/100
      // 至少5%的概率突破成功
      if (!Method.isTrueInRange(1, 100, p < 5 ? 5 : p)) {
        /** 随机顺序损失经验  */
        const randomKey = Levels.getRandomKey()
        const size = Math.floor((UserLevel?.experience ?? 0) / (randomKey + 1))
        // 清理经验
        await Levels.reduceExperience(UID, ID, size)
        // 返回突破失败信息
        const msg = await Levels.getCopywriting(
          ID,
          randomKey,
          size > 999999 ? 999999 : size
        )
        //
        Send(Text(msg))
        return false
      }
      return true
    }

    const isUp = await levelUp()

    if (!isUp) {
      // 突破失败
      return
    }

    // 下一个境界不存在，表示目前是最高境界
    if (!nextLevel) {
      Send(Text('已至极限'))
      return
    }

    // 保存境界信息
    await user_level.update(
      {
        addition: 0,
        realm: UserLevel.realm + 1,
        experience: UserLevel.experience - nowLevel.exp_needed
      },
      {
        where: {
          type: ID,
          uid: UID
        }
      }
    )

    Send(Text(`境界提升至${nextLevel.name}`))

    // 突破直接满血
    setTimeout(async () => {
      // 更新面板
      Equipment.updatePanel(UID, UserData.battle_blood_limit)
    }, 1500)

    //
  },
  'message.create',
  /^(#|\/)?(顿悟|頓悟)$/
)
