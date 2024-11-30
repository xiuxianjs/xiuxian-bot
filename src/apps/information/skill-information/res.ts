import { pictureRender } from '@xiuxian/img/index'
import { Skills } from '@xiuxian/core/index'
import * as Server from '@xiuxian/statistics/index'
import { Image, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)
    const Send = useSend(e)
    const UserData = e['UserData']
    Skills.updataEfficiency(UID, UserData.talent).then(() => {
      Server.skillInformation(UID, e.UserAvatar).then(res => {
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
  'message.create',
  /^(#|\/)我的功法$/
)
