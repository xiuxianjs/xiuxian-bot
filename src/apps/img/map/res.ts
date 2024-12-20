import { Image, useSend } from 'alemonjs'
import { lcalCacheImage } from '@xiuxian/utils/index'
import img_map from '@src/assets/img/map.jpg'
export default OnResponse(async (e, next) => {
  if (!/^(#|\/)(修仙)?(地图|地圖)$/.test(e.MessageText)) {
    next()
    return
  }
  // 不变的图片做缓存处理
  const img = lcalCacheImage(img_map)
  const Send = useSend(e)
  if (typeof img != 'boolean') {
    Send(Image(img, 'buffer'))
  } else {
    //
  }
}, 'message.create')
