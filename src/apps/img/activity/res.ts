import { Image, useSend } from 'alemonjs'
import { pictureRender } from '@xiuxian/img/index'
const imgData = {}
export default OnResponse(
  async (e, next) => {
    if (!/^(#|\/)查看(日常|限时|特殊)活动$/.test(e.MessageText)) {
      next()
      return
    }
    const Send = useSend(e)
    const txt = e.MessageText
    if (/日常/.test(txt)) {
      if (Object.prototype.hasOwnProperty.call(imgData, 'every_day')) {
        Send(Image(imgData['every_day'], 'buffer'))
        return
      }
      // 得 buffer
      imgData['every_day'] = await pictureRender('Activety', {
        select: 'every_day'
      }).catch(console.error)
      Send(Image(imgData['every_day'], 'buffer'))
      return
    } else if (/限时/.test(txt)) {
      if (Object.prototype.hasOwnProperty.call(imgData, 'limit_time')) {
        Send(Image(imgData['limit_time'], 'buffer'))
        return
      }
      // 得 buffer
      imgData['limit_time'] = await pictureRender('Activety', {
        select: 'limit_time'
      }).catch(console.error)
      Send(Image(imgData['limit_time'], 'buffer'))
      return
    } else {
      if (Object.prototype.hasOwnProperty.call(imgData, 'version')) {
        Send(Image(imgData['version'], 'buffer'))
        return
      }
      // 得 buffer
      imgData['version'] = await pictureRender('Activety', {
        select: 'version'
      }).catch(console.error)
      Send(Image(imgData['version'], 'buffer'))
      return
    }
  },
  ['message.create', 'private.message.create']
)
