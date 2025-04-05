import { Image, Text, useSend } from 'alemonjs'
import Xiuxian, { selects } from '@src/apps/index'
import { showSky } from '@xiuxian/statistics/index'
import { user_sky_ranking } from '@src/xiuxian/db'
import { UserDataType } from '@src/xiuxian/api'
import { renderComponentToBuffer } from 'jsxp'
import XSky from '@src/xiuxian/img/src/views/XSky'
export const regular = /^(#|\/)?查看(通天塔|至尊榜|天命榜)$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UID = e.UserKey
    const UserData = e['UserData'] as UserDataType
    const Send = useSend(e)
    // 查看数据是否存在
    const data = await user_sky_ranking
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
    const img = await renderComponentToBuffer('SkyComponent', XSky, {
      data: sData,
      theme: UserData?.theme ?? 'dark'
    })
    if (typeof img != 'boolean') {
      Send(Image(img))
    }
    //
  }
])
