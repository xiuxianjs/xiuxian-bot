import { Image, useSend } from 'alemonjs'
import { pictureRender } from '@xiuxian/img/index'
const imgData = {}
import Xiuxian from '@src/apps/index'

export const regular = /^(#|\/)查看(日常|限时|特殊)活动$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const Send = useSend(e)
      const txt = e.MessageText
      if (/日常/.test(txt)) {
        if (Object.prototype.hasOwnProperty.call(imgData, 'every_day')) {
          Send(Image(imgData['every_day']))
          return
        }
        // 得 buffer
        imgData['every_day'] = await pictureRender('Activety', {
          select: 'every_day',
          theme: 'dark'
        }).catch(console.error)
        Send(Image(imgData['every_day']))
        return
      } else if (/限时/.test(txt)) {
        if (Object.prototype.hasOwnProperty.call(imgData, 'limit_time')) {
          Send(Image(imgData['limit_time']))
          return
        }
        // 得 buffer
        imgData['limit_time'] = await pictureRender('Activety', {
          select: 'limit_time',
          theme: 'dark'
        }).catch(console.error)
        Send(Image(imgData['limit_time']))
        return
      } else {
        if (Object.prototype.hasOwnProperty.call(imgData, 'version')) {
          Send(Image(imgData['version']))
          return
        }
        // 得 buffer
        imgData['version'] = await pictureRender('Activety', {
          select: 'version',
          theme: 'dark'
        }).catch(console.error)
        Send(Image(imgData['version']))
        return
      }
    }
  ],
  ['message.create', 'private.message.create']
)
