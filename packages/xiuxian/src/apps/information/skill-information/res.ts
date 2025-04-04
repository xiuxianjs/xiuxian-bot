import { Skills } from '@xiuxian/core/index'
import * as Server from '@xiuxian/statistics/index'
import { Image, useSend } from 'alemonjs'
import Xiuxian, { selects, useCurrent } from '@src/apps/index'
import { renderComponentToBuffer } from 'jsxp'
import XSkills from '@src/xiuxian/img/src/views/XSkills'
export const regular = /^(#|\/)?我的功法$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UID = e.UserKey
    const Send = useSend(e)
    const UserData = useCurrent(e).UserData
    Skills.updataEfficiency(UID, UserData.talent).then(() => {
      Server.skillInformation(UID).then(async res => {
        const avatar = await e.UserAvatar.toURL()
        renderComponentToBuffer('SkillsComponent/' + res.UID, XSkills, {
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
])
