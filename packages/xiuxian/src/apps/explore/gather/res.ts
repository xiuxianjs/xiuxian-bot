import { Text, useSend } from 'alemonjs'
import { killNPC } from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
import { user, user_level } from '@xiuxian/db/index'
import Xiuxian, { useCurrent, selects } from '@src/apps/index'
export const regular = /^(#|\/)?开采\d+(\*1|\*2)?$/
/**
 * tudo
 */
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // lock start
    const T = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey

    const UserData = useCurrent(e).UserData

    return

    const text = e.MessageText

    const [id, count] = text.replace(/^(#|\/)?开采/, '').split('*')

    // 看看境界
    const realm = await user_level
      .findOneValue({
        where: {
          uid: UID,
          type: 1
        }
      })
      .then(item => item.realm)

    const Size = Number(
      count == '' || count == undefined || realm < 25 || Number(count) > 2
        ? 1
        : count
    )

    // 检查
    if (!(await GameApi.Bag.searchBagByName(UID, '开灵铲', Size))) {
      Send(Text(`开灵铲不足${Size}个`))

      return
    }

    if (!(await killNPC(e, id, UID, UserData.special_prestige))) return

    // 得到灵矿
    const explore = await GameApi.explore.explorecache(UserData.point_type)

    const ep = explore[id]

    // 是否在城里 是否存在  是否充足
    if (UserData.pont_attribute == 1 || !ep || ep.acount < 1) {
      Send(Text(`这里没有[${id}],去别处看看吧`))

      return
    }

    // 灵力不足
    if (UserData.special_spiritual <= ep.spiritual * Size) {
      Send(
        Text(
          `${UserData.immortal_grade > 0 ? '仙力' : '灵力'}不足${ep.spiritual * Size}`
        )
      )
      return
    }

    // 减少灵矿
    await GameApi.explore.reduce(UserData.point_type, id, Size)

    // 减少铲子
    await GameApi.Bag.reduceBagThing(UID, [
      {
        name: '开灵铲',
        acount: 1 * Size
      }
    ])

    // 得到该灵矿的数据
    const name = `${getMoneyGrade(ep.grade)}灵石`

    // 增加物品
    await GameApi.Bag.addBagThing(UID, [
      {
        name: name,
        acount: ep.money * Size
      }
    ])

    // 减少灵力 保存灵力信息
    await user.update(
      {
        special_spiritual: UserData.special_spiritual - ep.spiritual * Size
      },
      {
        where: {
          uid: UID
        }
      }
    )

    Send(Text(`采得[${name}]*${ep.money * Size}`))

    return
  }
])

/**
 *
 * @param grade
 * @returns
 */
function getMoneyGrade(grade: number) {
  if (grade == 1) return '下品'
  if (grade == 2) return '中品'
  if (grade == 3) return '上品'
  if (grade == 4) return '极品'
}
