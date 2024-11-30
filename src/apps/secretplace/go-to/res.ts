import { endAllWord } from '@xiuxian/api/index'
import { Op, literal } from 'sequelize'
import { Method, move, operationLock, Status } from '@xiuxian/core/index'
import { Text, useParse, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { Attributes, map_point, user, user_level } from '@src/xiuxian/db'
export default OnResponse(
  async e => {
    // 操作锁
    const TT = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = await getEmailUID(e.UserId)

    // 校验
    const UserData = e['UserData'] as Attributes<typeof user>

    // 闭关等长期状态自动结束
    if (
      Status.getStatus(UserData, 'biguan').status == 200 ||
      Status.getStatus(UserData, 'dazuo').status == 200 ||
      Status.getStatus(UserData, 'duanti').status == 200
    ) {
      UserData.state = 0
      await endAllWord(e, UID, UserData)
      Send(Text('已自动结束闭关/打坐/锻体'))
    }

    // 非可行

    // 不是空闲
    const status = Status.getStatus(UserData, 'kongxian')
    if (status.status != 200) {
      Send(Text(status.message))
      return
    }

    // 血量为空
    if (!Status.isPass(UserData)) {
      Send(Text('血量不足，无法移动'))
      return
    }

    const text = useParse(e.Megs, 'Text')

    // 检查地点
    const address = text.replace(/^(#|\/)前往/, '')

    // 得到地点数据
    const point = await map_point.findOneValue({
      // 找到离自己最近的
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
          // 模糊匹配
          [Op.like]: `%${address}%`
        }
      }
    })

    // 判断
    if (!point) {
      Send(Text(`未知地点[${address}]`))
      return
    }

    // 判断
    const LevelsMsg = await user_level.findOneValue({
      where: {
        uid: UID,
        type: 1
      }
    })

    // 境界不足
    if (LevelsMsg.realm < point.grade - 1) {
      Send(Text('境界不足'))
      return
    }

    // 3秒一次
    const time = 3000

    // 步伐控制
    const size = 15 + UserData.battle_speed / 5

    await move.setJob(UID, point.x, point.y, point.z, size)

    const { hours, minutes, seconds, totalMilliseconds } =
      move.estimateTotalExecutionTime(
        UserData.pont_x,
        UserData.pont_y,
        point.x,
        point.y,
        size,
        time
      )

    const msg = Method.timeChange(Date.now() + totalMilliseconds)

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
  /^(#|\/)前往[\u4e00-\u9fa5]+$/
)
