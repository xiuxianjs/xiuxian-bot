import { Image, useSend } from 'alemonjs'
import { Cooling } from '@xiuxian/core/index'
import { pictureRender } from '@xiuxian/img/index'
import Xiuxian from '@src/apps/index'
export const regular = /^(#|\/)查看配置$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)查看配置$/.test(e.MessageText)) {
        next()
        return
      }
      const img = await pictureRender('Defsetcomponent', {
        data: Cooling,
        theme: 'dark'
      })
      const Send = useSend(e)
      if (typeof img != 'boolean') {
        Send(Image(img))
      } else {
        //
      }
      return
    }
  ],
  ['message.create', 'private.message.create']
)
