import { Text, useSend } from 'alemonjs'
import {
  // Bag,
  Equipment,
  Levels,
  Method,
  operationLock
} from '@xiuxian/core/index'
import { levels, user, user_level } from '@src/xiuxian/db'
import { NAMEMAP } from '@src/xiuxian/core/src/users/additional/levels'
import Xiuxian, { useCurrent, selects } from '@src/apps/index'
export const regular = /^(#|\/)?突破$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // lock start
    const T = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    const ID = 1
    const UID = e.UserKey

    // 校验
    const UserData = useCurrent(e).UserData

    // 得到数据
    const UserLevel = await user_level.findOneValue({
      where: {
        uid: UID,
        type: ID
      }
    })

    // 查看当前境界所在位置
    const LevelsData = await levels.findAllValues({
      where: {
        type: ID
      },
      //  grade 排序
      order: [['grade', 'DESC']],
      limit: 3
    })

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
    const nowLevel = await levels.findOneValue({
      where: {
        type: ID,
        grade: realm
      },
      // 按 grade 排序
      order: [['grade', 'DESC']],
      limit: 3
    })

    // 判断经验够不够
    if (UserLevel.experience < nowLevel.exp_needed) {
      Send(Text(`${NAMEMAP[ID]}不足`))
      return
    }

    // 查看下一个境界
    const nextLevel = await levels.findOneValue({
      where: {
        type: ID,
        grade: realm + 1
      },
      // 按 grade 排序
      order: [['grade', 'DESC']],
      limit: 3
    })

    /**
     *
     * @returns
     */
    const levelUp = async () => {
      // 取值范围 [1 100 ] 突破概率为 (value-realm-grade)/100
      let p = 90 - realm - UserData.immortal_grade * 3
      let max = 100
      if (UserData.immortal_grade >= 200) {
        //  1/1000
        max = 100000
        p = 1
      } else if (
        UserData.immortal_grade < 200 &&
        UserData.immortal_grade >= 100
      ) {
        //    1/10000
        max = 10000
        p = 1
      } else if (
        UserData.immortal_grade < 100 &&
        UserData.immortal_grade >= 50
      ) {
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

    /***
     * 境界变动的时候
     * 更新灵力上限
     */
    user.update(
      {
        special_spiritual_limit: 100 + nextLevel.grade + UserData.immortal_grade
      },
      {
        where: {
          uid: UID
        }
      }
    )

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

    setTimeout(async () => {
      // 突破不再满血。
      Equipment.updatePanel(UID, UserData.battle_blood_now)
    }, 1500)
  }
])
