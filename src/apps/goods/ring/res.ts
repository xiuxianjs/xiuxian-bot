import { Image, Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { pictureRender } from '@xiuxian/img/index'
import * as Server from '@xiuxian/statistics/index'
import { operationLock } from '@src/xiuxian/core'
import { Attributes, user } from '@src/xiuxian/db'
export default OnResponse(async (e, next) => {
  if (!/^(#|\/)我的(戒指|(纳|呐|那)(借|介|戒))$/.test(e.MessageText)) {
    next()
    return
  }
  const TT = await operationLock(e.UserKey)
  const Send = useSend(e)
  if (!TT) {
    Send(Text('操作频繁'))
    return
  }

  const UID = await getEmailUID(e.UserKey)
  const UserData = e['UserData'] as Attributes<typeof user>
  const data = await Server.ringInformation(UID)
  const img = await pictureRender('BagComponent', {
    data,
    theme: UserData?.theme ?? 'dark'
  })

  if (typeof img != 'boolean') {
    Send(Image(img, 'buffer'))
  }
}, 'message.create')
