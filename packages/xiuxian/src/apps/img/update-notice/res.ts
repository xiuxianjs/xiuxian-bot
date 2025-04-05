import { Image, Text, useSend } from 'alemonjs'
import json_update from '@src/assets/defset/update.json'
import Xiuxian, { selects } from '@src/apps/index'
import { renderComponentToBuffer } from 'jsxp'
import XUpdate from '@src/xiuxian/img/src/views/XUpdate'
export const regular = /^(#|\/)?查看更新$/
const HelpCache = new Map<string, Buffer>()
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const name = 'help-update'
    const Send = useSend(e)
    if (HelpCache.has(name)) {
      Send(Image(HelpCache.get(name)))
      return
    }
    // 得 buffer
    const imgData = await renderComponentToBuffer('UpdateComponent', XUpdate, {
      data: json_update,
      theme: 'dark'
    }).catch(console.error)
    if (!imgData || typeof imgData === 'boolean') {
      Send(Text('图片错误'))
      return
    }
    HelpCache.set(name, imgData)
    Send(Image(imgData))
    return
  }
])
