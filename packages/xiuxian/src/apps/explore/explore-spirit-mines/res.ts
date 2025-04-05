import { Text, useSend } from 'alemonjs'
import { ControlByBlood } from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'

import Xiuxian, { useCurrent, selects } from '@src/apps/index'

export const regular = /^(#|\/)?探索灵矿$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UserData = useCurrent(e).UserData
    if (!(await ControlByBlood(e, UserData))) return
    const Send = useSend(e)
    return
    // if (UserData.pont_attribute == 1) {
    //   Send(Text('[城主府]巡逻军:\n城内切莫释放神识!'))
    //   return
    // }
    // 得到位置名
    // const name = await GameApi.Map.getPlaceName(
    //   UserData.point_type,
    //   UserData.pont_attribute
    // )
    // tudo
    const name = '修仙大陆'
    // 消息
    const msg: string[] = [`[${name}]的灵矿`]
    // 得到灵矿
    const explore = await GameApi.explore.explorecache(UserData.point_type)
    for (const item in explore) {
      msg.push(
        `🔹标记:${item}(${getMoneyGrade(explore[item].grade)}灵矿)*${
          explore[item].acount
        }`
      )
    }
    Send(Text(msg.join('\n')))
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
