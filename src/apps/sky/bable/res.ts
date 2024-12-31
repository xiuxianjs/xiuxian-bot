import { Image, Text, useSend } from 'alemonjs'

import * as DB from '@xiuxian/db/index'
import { pictureRender } from '@xiuxian/img/index'
import { showSky } from '@xiuxian/statistics/index'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)查看(通天塔|至尊榜|天命榜)$/.test(e.MessageText)) {
      next()
      return
    }
    const UID = e.UserKey
    const UserData = e['UserData'] as DB.Attributes<typeof DB.user>
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
  ['message.create', 'private.message.create']
)
