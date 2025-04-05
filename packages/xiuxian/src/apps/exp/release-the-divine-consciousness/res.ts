import { ControlByBlood } from '@xiuxian/api/index'
import { Op } from 'sequelize'
import * as DB from '@xiuxian/db/index'
import Xiuxian, { selects, useCurrent } from '@src/apps/index'
import { Text, useSend } from 'alemonjs'
import { getAddressById } from '@src/xiuxian/core/src/system/address'
export const regular = /^(#|\/)?释放神识$/
const response = onResponse(selects, async e => {
  const UserData = useCurrent(e).UserData
  if (!(await ControlByBlood(e, UserData))) return
  const Send = useSend(e)
  if (e.name === 'private.message.create') {
    // 私聊不支持
    Send(Text('私聊不支持该玩法'))
    return
  }
  // 得到指定地址下的玩家
  const AddressID = e.ChannelId
  const UIDS = await getAddressById(AddressID)
  // 如果没人，或者只有自己。
  if (!UIDS || UIDS.length <= 1) {
    Send(Text('这附近没有人'))
    return
  }
  //
  const minBattleBlood = 1
  const AllUser = await DB.user.findAllValues({
    where: {
      // 不是自己的UID
      uid: UIDS,
      // 没有死亡的玩家
      age_state: 1,
      // 只能看到空闲玩家
      state: 0,
      // 只能看到血量大于1的玩家
      battle_blood_now: {
        [Op.gt]: minBattleBlood
      }
      // 只显示比自己战力低的
      // battle_power: {
      //   [Op.lte]: battle_power + 3280
      // },
    },
    // 战力高的在前面
    order: [['battle_power', 'DESC']],
    // 只显示十个玩家
    limit: 20
  })
  if (AllUser.length <= 0) {
    Send(Text('附近空无一人'))
    return
  }
  const msg = ['[附近道友]'].concat(
    AllUser.map(
      item =>
        `🔹标记:${item?.id},道号:${item.name}\n🩸${item?.battle_blood_now},战力:${item?.battle_power}`
    )
  )
  Send(Text(msg.join('\n')))
  return
})

export default onResponse(selects, [Xiuxian.current, response.current])
