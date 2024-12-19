import { Image, useSend } from 'alemonjs'
import { Cooling } from '@xiuxian/core/index'
import { pictureRender } from '@xiuxian/img/index'
export default OnResponse(async (e, next) => {
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
}, 'message.create')
