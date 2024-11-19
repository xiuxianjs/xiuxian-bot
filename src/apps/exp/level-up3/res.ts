import { Text, useSend } from 'alemonjs'
import { isUser } from '@xiuxian/api/index'
import {
  Bag,
  Equipment,
  Levels,
  Method,
  operationLock
} from '@xiuxian/core/index'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { goods, levels, levels_limit, user, user_level } from '@src/xiuxian/db'
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
    const ID = 1
    const UID = await getEmailUID(e.UserId)
    // 校验
    const UserData = await isUser(e, UID)

    // 数据拦截
    if (typeof UserData === 'boolean') return

    // 得到数据
    const UserLevel = await user_level
      .findOne({
        attributes: ['addition', 'realm', 'experience'],
        where: {
          uid: UID,
          type: ID
        }
      })
      .then(res => res?.dataValues)

    // 查看当前境界所在位置
    const LevelsData = await levels
      .findAll({
        attributes: ['id', 'exp_needed', 'grade', 'type', 'name'],
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
        attributes: ['id', 'exp_needed', 'grade', 'type', 'name'],
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
        attributes: ['id', 'exp_needed', 'grade', 'type', 'name'],
        where: {
          type: ID,
          grade: realm + 1
        },
        // 按 grade 排序
        order: [['grade', 'DESC']],
        limit: 3
      })
      .then(res => res?.dataValues)

    let things = []

    if (nextLevel) {
      // 得到该境界所需要的物品
      const LevelsLimit = await levels_limit
        .findOne({
          where: {
            grade: nextLevel.grade,
            // 境界类型1
            typing: 1
          }
        })
        .then(res => res?.dataValues)

      // 该境界存在门槛。
      if (LevelsLimit) {
        //
        const length = UserData.talent.length
        //
        const gids = LevelsLimit.gids.split('.')
        //
        const goodsData = await goods.findAllValues({
          where: {
            id: gids
          }
        })
        let pass = false
        things = await Bag.searchAllByName(
          UID,
          goodsData.map(item => item.name)
        )
        for (const item of goodsData) {
          const thing = things.find(thing => thing.name === item.name)
          // 不存在
          if (!thing) {
            pass = true
            break
          }
          if (thing.acount < length * length) {
            pass = true
            break
          }
        }
        // 物品不满足要求
        if (pass) {
          const msgs = goodsData.map(item => `${item.name}*${length * length}`)
          // gids
          Send(Text(['突破到下境界需要:', ...msgs].join('\n')))
          return
        }
        // 扣除突破物品
      }
    }

    /**
     *
     * @returns
     */
    const levelUp = async () => {
      // 取值范围 [1 100 ] 突破概率为 (value-realm-grade)/100
      let p = 90 - realm - UserData.immortal_grade * 3
      let max = 100
      if (UserData.immortal_grade >= 50) {
        //  1/1000
        max = 1000
        p = 1
      } else if (UserData.immortal_grade < 50 && UserData.immortal_grade > 15) {
        //    1/100
        max = 100
        p = 1
      }
      // 至少5%的概率突破成功
      if (!Method.isTrueInRange(1, max, p)) {
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

    // 扣除突破物品
    if (things.length >= 1) {
      // 扣除物品
      Bag.reduceBagThing(
        UID,
        things.map(item => {
          return {
            name: item.name,
            acount: item.acount
          }
        })
      )
    }

    // 下一个境界不存在，表示目前是最高境界
    if (!nextLevel) {
      // 提升用户的 仙人境
      const size = UserData.immortal_grade + 1
      user.update(
        {
          immortal_grade: size,
          special_spiritual_limit: 100 + UserLevel.realm + size
        },
        {
          where: {
            uid: UID
          }
        }
      )
      Send(Text(`仙人境提升${size}`))
      return
    }

    // 减少境界
    UserLevel.experience -= nowLevel.exp_needed

    // 调整境界
    UserLevel.realm += 1

    /***
     * 境界变动的时候
     * 更新灵力上限
     */
    user.update(
      {
        special_spiritual_limit: 100 + UserLevel.realm + UserData.immortal_grade
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

    Send(Text(`境界提升至${nextLevel.name}`))

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
