import { Image, useSend } from 'alemonjs'
import { Cooling } from '@xiuxian/core/index'
import { pictureRender } from '@xiuxian/img/index'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)查看配置$/.test(e.MessageText)) {
      next()
      return
    }
    const img = await pictureRender('Defsetcomponent', {
      data: Cooling
    })
    const Send = useSend(e)
    if (typeof img != 'boolean') {
      Send(Image(img, 'buffer'))
    } else {
      //
    }
    return
  },
  ['message.create', 'private.message.create']
)
