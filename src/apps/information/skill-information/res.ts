import { pictureRender } from '@xiuxian/img/index'
import { Skills } from '@xiuxian/core/index'
import * as Server from '@xiuxian/statistics/index'
import { Image, useSend } from 'alemonjs'

import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)我的功法$/.test(e.MessageText)) {
      next()
      return
    }
    const UID = e.UserKey
    const Send = useSend(e)
    const UserData = e['UserData']
    Skills.updataEfficiency(UID, UserData.talent).then(() => {
      Server.skillInformation(UID).then(res => {
        pictureRender('SkillsComponent', {
          data: res,
          theme: UserData?.theme ?? 'dark'
        }).then(img => {
          if (typeof img != 'boolean') {
            Send(Image(img))
          }
        })
      })
    })
    return
  },
  ['message.create', 'private.message.create']
)
