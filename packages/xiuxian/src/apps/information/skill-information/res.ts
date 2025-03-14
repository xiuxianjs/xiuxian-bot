import { pictureRender } from '@xiuxian/img/index'
import { Skills } from '@xiuxian/core/index'
import * as Server from '@xiuxian/statistics/index'
import { Image, useSend } from 'alemonjs'

import Xiuxian from '@src/apps/index'

export const regular = /^(#|\/)我的功法$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const UID = e.UserKey
      const Send = useSend(e)
      const UserData = e['UserData']
      Skills.updataEfficiency(UID, UserData.talent).then(() => {
        Server.skillInformation(UID).then(async res => {
          const avatar = await e.UserAvatar.toURL()
          pictureRender('SkillsComponent', {
            data: res,
            theme: UserData?.theme ?? 'dark',
            avatar: avatar
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
