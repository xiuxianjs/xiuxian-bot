import { Equipment } from '@xiuxian/core/index'
import * as Server from '@xiuxian/statistics/index'
import { pictureRender } from '@xiuxian/img/index'
import { Image, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)

    const Send = useSend(e)

    const UserData = e['UserData']

    Equipment.updatePanel(UID, UserData.battle_blood_now).then(() => {
      Server.equipmentInformation(UID, e.UserAvatar).then(res => {
        pictureRender('Equipmentcomponent', {
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
  /^(#|\/)?我的面板$/
)
