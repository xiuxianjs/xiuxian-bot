import { Text, useSend } from 'alemonjs'
import { showUserMsg } from '@xiuxian/api/index'
import { Skills, Equipment } from '@xiuxian/core/index'
import Xiuxian, { selects, useCurrent } from '@src/apps/index'
export const regular = /^(#|\/)?我的资料$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UID = e.UserKey
    const UserData = useCurrent(e).UserData
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
])
