import { Text, useSend } from 'alemonjs'

import { showUserMsg } from '@xiuxian/api/index'
import { Skills, Equipment } from '@xiuxian/core/index'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)我的资料$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)我的资料$/.test(e.MessageText)) {
        next()
        return
      }
      const UID = e.UserKey
      const UserData = e['UserData']
      Promise.all([
        Skills.updataEfficiency(UID, UserData.talent),
        Equipment.updatePanel(UID, UserData.battle_blood_now),
        showUserMsg(e)
      ]).catch(err => {
        console.error(err)
        const Send = useSend(e)
        Send(Text('数据处理错误'))
      })

      return
    }
  ],
  ['message.create', 'private.message.create']
)
