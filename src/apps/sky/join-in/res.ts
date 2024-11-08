import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { isUser } from '@xiuxian/api/index'
import * as DB from '@xiuxian/db/index'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)

    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return

    const Send = useSend(e)

    //查看数据是否存在
    const data = await DB.user_sky_ranking
      .findOne({
        where: {
          uid: UID
        }
      })
      .then(res => res?.dataValues)

    if (data) {
      Send(Text('已进入'))

      return
    }

    Send(Text('进入通天塔'))

    await DB.user_sky_ranking.create({
      uid: UID
    })
  },
  'message.create',
  /^(#|\/)?进入通天塔$/
)
