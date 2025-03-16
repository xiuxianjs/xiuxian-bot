import { Text, useSend } from 'alemonjs'
import { Equipment } from '@xiuxian/core/index'
import { user } from '@src/xiuxian/db'
import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^(#|\/)天道更新面板/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    if (!e.IsMaster) return
    const text = e.MessageText
    if (!text) return
    const Send = useSend(e)
    user.findAllValues().then(data => {
      Promise.all(
        data.map(item => Equipment.updatePanel(item.uid, item.battle_blood_now))
      )
    })
    Send(Text('开始推送面板更新进程'))
    return
  }
])
