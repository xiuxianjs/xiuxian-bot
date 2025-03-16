import { Image, useSend } from 'alemonjs'
import { pictureRender } from '@xiuxian/img/index'
import json_update from '@src/assets/defset/update.json'
const helpData = {}

import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^(#|\/)查看更新$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const name = 'help-update'
    const Send = useSend(e)
    if (Object.prototype.hasOwnProperty.call(helpData, name)) {
      Send(Image(helpData[name]))
      return
    }
    const data = json_update
    // 得 buffer
    helpData[name] = await pictureRender('UpdateComponent', {
      data: data,
      theme: 'dark'
    }).catch(console.error)
    Send(Image(helpData[name]))
    return
  }
])
