import { ControlByBlood, endAllWord } from '@xiuxian/api/index'
import { Op, literal } from 'sequelize'
import * as DB from '@xiuxian/db/index'
import * as GameApi from '@xiuxian/core/index'
import { Text, useParse, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(
  async e => {
    // 操作锁
    const TT = await GameApi.operationLock(e.UserId)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = await getEmailUID(e.UserId)

    // 校验
    const UserData = e['UserData'] as DB.Attributes<typeof DB.user>

    // 闭关等长期状态自动结束
    if (UserData.state == 1 || UserData.state == 2 || UserData.state == 8) {
      await endAllWord(e, UID, UserData)
      Send(Text('已自动结束闭关/打坐/锻体'))
      return
    }

    if (!(await ControlByBlood(e, UserData))) return

    const text = useParse(e.Megs, 'Text')

    // 检查地点
    const address = text.replace(/^(#|\/)?前往/, '')

    // 得到地点数据
    const point = await DB.map_point
      .findOne({
        order: [
          [
            literal(`CASE
        WHEN x >= ${UserData.pont_x - 200} AND x <= ${
          UserData.pont_x + 200
        } THEN 0
        ELSE ABS(x - ${UserData.pont_x})
      END`),
            'ASC'
          ],
          [
            literal(`CASE
        WHEN y >= ${UserData.pont_y - 200} AND y <= ${
          UserData.pont_y + 200
        } THEN 0
        ELSE ABS(y - ${UserData.pont_y})
      END`),
            'ASC'
          ]
        ],
        where: {
          name: {
            [Op.like]: `%${address}%`
          }
        }
      })
      .then(res => res?.dataValues)

    // 判断
    if (!point) {
      Send(Text('未知地点'))
      return
    }

    // 判断
    const LevelsMsg = await DB.user_level
      .findOne({
        where: {
          uid: UID,
          type: 1
        }
      })
      .then(res => res?.dataValues)

    // 境界不足
    if (LevelsMsg.realm < point.grade - 1) {
      Send(Text('境界不足'))
      return
    }

    // 3秒一次
    const time = 3000

    // 步伐控制
    const size = 15 + UserData.battle_speed / 5

    await GameApi.move.setJob(UID, point.x, point.y, point.z, size)

    const { hours, minutes, seconds, totalMilliseconds } =
      GameApi.move.estimateTotalExecutionTime(
        UserData.pont_x,
        UserData.pont_y,
        point.x,
        point.y,
        size,
        time
      )

    const msg = GameApi.Method.timeChange(
      new Date().getTime() + totalMilliseconds
    )

    Send(
      Text(
        [
          `正在前往,${point.name}...`,
          `\n预计到达时间(${hours}h${minutes}m${seconds}s):`,
          `\n${msg}`
        ].join('')
      )
    )

    return
  },
  'message.create',
  /^(#|\/)?前往[\u4e00-\u9fa5]+$/
)
