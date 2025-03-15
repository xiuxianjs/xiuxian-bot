import { Equipment } from '@xiuxian/core/index'
import * as Server from '@xiuxian/statistics/index'
import { pictureRender } from '@xiuxian/img/index'
import { Image, useSend } from 'alemonjs'

import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)我的面板$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UID = e.UserKey

    const Send = useSend(e)

    const UserData = e['UserData']

    Equipment.updatePanel(UID, UserData.battle_blood_now).then(() => {
      Server.equipmentInformation(UID).then(async res => {
        const avatar = await e.UserAvatar.toURL()
        pictureRender('Equipmentcomponent', {
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
