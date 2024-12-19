import { ControlByBlood } from '@xiuxian/api/index'
import { Op } from 'sequelize'
import * as DB from '@xiuxian/db/index'
import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(async (e, next) => {
  if (!/^(#|\/)释放神识$/.test(e.MessageText)) {
    next()
    return
  }
  const UID = await getEmailUID(e.UserKey)
  const UserData = e['UserData'] as DB.Attributes<typeof DB.user>
  if (!(await ControlByBlood(e, UserData))) return
  const Send = useSend(e)
  if (UserData.pont_attribute == 1) {
    Send(Text('[城主府]巡逻军:\n城内切莫释放神识!'))
    return
  }
  // 战力
  const battle_power = UserData.battle_power ?? 20
  //
  const LevelData = await DB.user_level.findOneValue({
    where: {
      uid: UID,
      type: 3
    }
  })
  // 有效距离为
  const distanceThreshold = (LevelData.realm ?? 1) * 10 + 50
  //
  const minBattleBlood = 1
  const AllUser = await DB.user.findAllValues({
    where: {
      // 不是自己的UID
      uid: {
        [Op.ne]: UID
      },
      // 区域一样的玩家
      point_type: UserData.point_type,
      // 没有死亡的玩家
      age_state: 1,
      // 只能看到空闲玩家
      state: 0,
      // 只能看到血量大于1的玩家
      battle_blood_now: {
        [Op.gt]: minBattleBlood
      },
      // 只显示比自己战力低的
      battle_power: {
        [Op.lte]: battle_power + 3280
      },
      pont_x: {
        [Op.between]: [
          UserData.pont_x - distanceThreshold,
          UserData.pont_x + distanceThreshold
        ]
      },
      pont_y: {
        [Op.between]: [
          UserData.pont_y - distanceThreshold,
          UserData.pont_y + distanceThreshold
        ]
      },
      // 位面不取范围
      pont_z: UserData.pont_z
    },
    // 战力高的在前面
    order: [['battle_power', 'DESC']],
    // 只显示十个玩家
    limit: 10
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
}, 'message.create')
