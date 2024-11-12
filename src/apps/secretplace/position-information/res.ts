import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { isUser, sendReply } from '@xiuxian/api/index'
import * as DB from '@xiuxian/db/index'
export default OnResponse(
  async e => {
    // 获取用户信息
    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return
    const PositionData = await DB.map_point
      .findAll({})
      .then(res => res.map(item => item?.dataValues))
    const msg: string[] = []
    for await (const item of PositionData) {
      if (
        item?.z == UserData.pont_z &&
        item?.attribute == UserData.pont_attribute &&
        item?.type == UserData.point_type
      ) {
        msg.push(`地点名:${item?.name}\n坐标(${item?.x},${item?.y},${item?.z})`)
      }
    }
    sendReply(e, '[查看当前位置]', msg)
    return
  },
  'message.create',
  /^(#|\/)?查看当前位置$/
)
