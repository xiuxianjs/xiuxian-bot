import { pictureRender } from '@xiuxian/img/index'
import { Skills } from '@xiuxian/core/index'
import * as Server from '@xiuxian/statistics/index'
import { Image, useSend } from 'alemonjs'

import Xiuxian from '@src/apps/index'
export const regular = /^(#|\/)我的功法$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
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
    }
  ],
  ['message.create', 'private.message.create']
)
