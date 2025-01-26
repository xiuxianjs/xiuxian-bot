import { Image, useSend } from 'alemonjs'
import { pictureRender } from '@xiuxian/img/index'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)查看配置$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const img = await pictureRender('Defsetcomponent', {
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
