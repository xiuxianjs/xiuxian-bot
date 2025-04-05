import { Text, useSend } from 'alemonjs'
import { Monster, Status } from '@xiuxian/core/index'
import * as DB from '@xiuxian/db/index'
import Xiuxian, { selects, useCurrent } from '@src/apps/index'
export const regular = /^(#|\/)?探索怪物$/
/**
 * tudo
 *
 */
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    return
    const UserData = useCurrent(e).UserData
    const Send = useSend(e)
    // 在城里
    if (UserData.pont_attribute == 1) {
      Send(Text('[城主府]巡逻军:\n城内切莫释放神识!'))
      return
    }
    const status = Status.getStatus(UserData, 'kongxian')
    if (status.status !== 200) {
      Send(Text(status.message))
      return
    }
    if (!Status.isPass(UserData)) {
      Send(Text('血量不足,无法释放神识'))
      return
    }
    // 得到地名

    // tudo
    const name = '修仙大陆'
    // const name = await Map.getPlaceName(
    //   UserData.point_type,
    //   UserData.pont_attribute
    // )
    // 得到怪物境界
    const MonsterData = await DB.levels.findAllValues({
      where: {
        type: 0
      }
    })
    // 得到怪物
    const monster = await Monster.monsterscache(UserData.point_type)
    // monster 是一个对象 需要先按等级排序
    const sortedMonsters = Object.keys(monster).sort(
      (a, b) => monster[a].level - monster[b].level
    )
    // 无
    if (sortedMonsters.length == 0) {
      Send(Text('附近无怪物'))
      return
    }
    const msg: string[] = [`[${name}]的妖怪`].concat(
      sortedMonsters.map(
        item =>
          `${item}(${MonsterData[monster[item].level]?.name})*${
            monster[item].acount
          }`
      )
    )
    Send(Text(msg.join('\n')))
    return
  }
])
