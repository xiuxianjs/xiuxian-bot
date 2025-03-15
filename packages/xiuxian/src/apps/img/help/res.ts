import { Image, useSend } from 'alemonjs'
import { pictureRender } from '@xiuxian/img/index'
import josn_base_help from '@src/assets/defset/base_help.json'
const helpData = {}
import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)(修仙)?((帮|幫)助|help)/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const text = e.MessageText
    if (!text) return
    const size = Number(text.replace(regular, ''))
    const n = isNaN(size) ? 0 : size
    const name = `help${n}`
    const Send = useSend(e)
    if (Object.prototype.hasOwnProperty.call(helpData, name)) {
      Send(Image(helpData[name]))
      return
    }
    helpData[name] = await pictureRender('HelpComponent', {
      data: [josn_base_help[n - 1] ?? josn_base_help[0]],
      theme: 'dark'
    }).catch(console.error)
    Send(Image(helpData[name])).catch(console.error)
    return
  }
])
