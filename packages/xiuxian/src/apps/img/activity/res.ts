import { Image, Text, useSend } from 'alemonjs'
import { renderComponentToBuffer } from 'jsxp'
import Xiuxian, { selects } from '@src/apps/index'
import Activety from '@src/xiuxian/img/src/views/Activety'
export const regular = /^(#|\/)?查看(日常|限时|特殊)活动$/
const ImageCache = new Map<string, Buffer>()
const activityMap = {
  日常: 'every_day',
  限时: 'limit_time',
  特殊: 'version'
}
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const Send = useSend(e)
    const txt = e.MessageText
    let imgData: boolean | Buffer | void = false
    const key = Object.keys(activityMap).find(k => new RegExp(k).test(txt))
    const cacheKey = key ? activityMap[key] : null
    if (cacheKey) {
      if (ImageCache.has(cacheKey)) {
        Send(Image(ImageCache.get(cacheKey)))
        return
      }
      // 得 buffer
      imgData = await renderComponentToBuffer('Activety', Activety, {
        select: cacheKey,
        theme: 'dark'
      }).catch(console.error)
    }
    if (Buffer.isBuffer(imgData)) {
      ImageCache.set(cacheKey, imgData)
      Send(Image(imgData))
    } else {
      Send(Text('获取活动失败'))
    }
  }
])
