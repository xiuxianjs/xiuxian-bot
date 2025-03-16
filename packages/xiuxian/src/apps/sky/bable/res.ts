import { Image, Text, useSend } from 'alemonjs'

import * as DB from '@xiuxian/db/index'

import Xiuxian, { selects } from '@src/apps/index'

import { pictureRender } from '@xiuxian/img/index'
import { showSky } from '@xiuxian/statistics/index'

export const regular = /^(#|\/)查看(通天塔|至尊榜|天命榜)$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
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
  }
])
