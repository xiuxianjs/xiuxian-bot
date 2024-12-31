import { Image, useSend } from 'alemonjs'
import { pictureRender } from '@xiuxian/img/index'
import json_update from '@src/assets/defset/update.json'
const helpData = {}
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)查看更新$/.test(e.MessageText)) {
      next()
      return
    }
    const name = 'help-update'
    const Send = useSend(e)
    if (Object.prototype.hasOwnProperty.call(helpData, name)) {
      Send(Image(helpData[name], 'buffer'))
      return
    }
    const data = json_update
    // 得 buffer
    helpData[name] = await pictureRender('UpdateComponent', {
      data: data
    }).catch(console.error)
    Send(Image(helpData[name], 'buffer'))
    return
  },
  ['message.create', 'private.message.create']
)
