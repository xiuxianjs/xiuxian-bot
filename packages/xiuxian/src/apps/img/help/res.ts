import { Image, Text, useSend } from 'alemonjs'
import josn_base_help from '@src/assets/defset/base_help.json'
import Xiuxian, { selects } from '@src/apps/index'
import { renderComponentToBuffer } from 'jsxp'
import XHelp from '@src/xiuxian/img/src/views/XHelp'
export const regular = /^(#|\/)?(修仙)?((帮|幫)助|help)/
const HelpCache = new Map<string, Buffer>()
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const text = e.MessageText
    if (!text) return
    const size = Number(text.replace(regular, ''))
    const n = isNaN(size) ? 0 : size
    const name = `help${n}`
    const Send = useSend(e)
    if (HelpCache.has(name)) {
      Send(Image(HelpCache.get(name)))
      return
    }
    const helpData = await renderComponentToBuffer('HelpComponent', XHelp, {
      data: [josn_base_help[n - 1] ?? josn_base_help[0]],
      theme: 'dark'
    }).catch(console.error)

    if (!helpData || typeof helpData === 'boolean') {
      Send(Text('图片错误'))
      return
    }

    HelpCache.set(name, helpData)

    Send(Image(helpData)).catch(console.error)

    return
  }
])
