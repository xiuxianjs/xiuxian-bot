import { Image, Text, useSend } from 'alemonjs'
import Xiuxian, { selects, useCurrent } from '@src/apps/index'
import { showSky } from '@xiuxian/statistics/index'
import { user_sky_ranking } from '@src/xiuxian/db'
import { renderComponentToBuffer } from 'jsxp'
import XSky from '@src/xiuxian/img/src/views/XSky'
export const regular = /^(#|\/)?查看(通天塔|至尊榜|天命榜)$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UID = e.UserKey
    const UserData = useCurrent(e).UserData
    const Send = useSend(e)
    // 查看数据是否存在
    const data = await user_sky_ranking.findOneValue({
      where: {
        uid: UID
      }
    })
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
