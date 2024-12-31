import { Image, useSend } from 'alemonjs'
import { pictureRender } from '@xiuxian/img/index'
import josn_base_help from '@src/assets/defset/base_help.json'
const helpData = {}
export default OnResponse(
  async (e, next) => {
    if (!/^(#|\/)(修仙(帮|幫)助|帮助)/.test(e.MessageText)) {
      next()
      return
    }
    const text = e.MessageText
    if (!text) return
    const size = Number(text.replace(/^(#|\/)(修仙(帮|幫)助|帮助)/, ''))
    const n = isNaN(size) ? 0 : size
    const name = `help${n}`
    const Send = useSend(e)
    if (Object.prototype.hasOwnProperty.call(helpData, name)) {
      Send(Image(helpData[name], 'buffer'))
      return
    }
    helpData[name] = await pictureRender('HelpComponent', {
      data: [josn_base_help[n - 1] ?? josn_base_help[0]]
    }).catch(console.error)
    Send(Image(helpData[name], 'buffer')).catch(console.error)
    return
  },
  ['message.create', 'private.message.create']
)
