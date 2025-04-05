import { Image, Text, useSend } from 'alemonjs'
import Xiuxian, { selects } from '@src/apps/index'
import { renderComponentToBuffer } from 'jsxp'
import XDefset from '@src/xiuxian/img/src/views/XDefset'
export const regular = /^(#|\/)?查看配置$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const img = await renderComponentToBuffer('Defsetcomponent', XDefset, {
      theme: 'dark'
    })
    const Send = useSend(e)
    if (typeof img != 'boolean') {
      Send(Image(img))
    } else {
      Send(Text('截图错误'))
    }
    return
  }
])
