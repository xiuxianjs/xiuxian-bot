import { Image, Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { isUser } from '@xiuxian/api/index'
import * as DB from '@xiuxian/db/index'
import { pictureRender } from '@xiuxian/img/index'
import { showSky } from '@xiuxian/statistics/index'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return
    const Send = useSend(e)
    // 查看数据是否存在
    const data = await DB.user_sky_ranking
      .findOne({
        where: {
          uid: UID
        }
      })
      .then(res => res?.dataValues)
    if (!data) {
      Send(Text('未进入'))
      return
    }
    const sData = await showSky(UID)
    const img = await pictureRender('SkyComponent', {
      data: sData,
      theme: UserData?.theme ?? 'dark'
    })
    if (typeof img != 'boolean') {
      Send(Image(img))
    }
    //
  },
  'message.create',
  /^(#|\/)?(通天塔|至尊榜|天命榜)$/
)
