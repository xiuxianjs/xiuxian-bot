import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { isUser } from '@xiuxian/api/index'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return
    const Send = useSend(e)
    Send(Text(`坐标(${UserData.pont_x},${UserData.pont_y},${UserData.pont_z})`))
    return
  },
  'message.create',
  /^(#|\/)?我的坐标$/
)
