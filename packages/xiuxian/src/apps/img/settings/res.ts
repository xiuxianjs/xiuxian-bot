import { Image, useSend } from 'alemonjs'
import { pictureRender } from '@xiuxian/img/index'
import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)查看配置$/
export default onResponse(selects, [
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
])
