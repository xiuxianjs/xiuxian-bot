import { sendReply } from '@xiuxian/api/index'
import * as DB from '@xiuxian/db/index'
import { useSend } from 'alemonjs'
export default OnResponse(
  async e => {
    // 获取用户信息
    const UserData = e['UserData'] as DB.Attributes<typeof DB.user>
    const PositionData = await DB.map_point
      .findAll({})
      .then(res => res.map(item => item?.dataValues))
    const msg: string[] = []
    for (const item of PositionData) {
      if (
        item?.z == UserData.pont_z &&
        item?.attribute == UserData.pont_attribute &&
        item?.type == UserData.point_type
      ) {
        msg.push(`地点名:${item?.name}\n坐标(${item?.x},${item?.y},${item?.z})`)
      }
    }
    const Send = useSend(e)
    sendReply(Send, '[当前位置]', msg)
    return
  },
  'message.create',
  /^(#|\/)查看当前位置$/
)
