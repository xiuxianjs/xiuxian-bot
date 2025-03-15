import { Image, useSend } from 'alemonjs'
import { lcalCacheImage } from '@xiuxian/utils/index'
import img_map from '@src/assets/img/map.jpg'
import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)(修仙)?(地图|地圖)$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // 不变的图片做缓存处理
    const img = lcalCacheImage(img_map)
    const Send = useSend(e)
    if (typeof img != 'boolean') {
      Send(Image(img))
    } else {
      //
    }
  }
])
