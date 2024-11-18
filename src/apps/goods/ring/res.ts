import { Image, Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { isUser } from '@xiuxian/api/index'
import { pictureRender } from '@xiuxian/img/index'
import * as Server from '@xiuxian/statistics/index'
import { operationLock } from '@src/xiuxian/core'
export default OnResponse(
  async e => {
    const TT = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return
    const data = await Server.ringInformation(UID, e.UserAvatar)
    const img = await pictureRender('BagComponent', {
      data,
      theme: UserData?.theme ?? 'dark'
    })

    if (typeof img != 'boolean') {
      Send(Image(img, 'buffer'))
    }
  },
  'message.create',
  /^(#|\/)?我的(戒指|(纳|呐|那)(借|介|戒))$/
)
