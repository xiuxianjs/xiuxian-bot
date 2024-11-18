import { Text, useParse, useSend } from 'alemonjs'
import { Equipment } from '@xiuxian/core/index'
import { user } from '@src/xiuxian/db'
export default OnResponse(
  async e => {
    if (!e.IsMaster) return
    const text = useParse(e.Megs, 'Text')
    if (!text) return
    const Send = useSend(e)
    user.findAllValues().then(data => {
      Promise.all(
        data.map(item => Equipment.updatePanel(item.uid, item.battle_blood_now))
      )
    })
    Send(Text('开始推送面板更新进程'))
    return
  },
  'message.create',
  /^(#|\/)?天道更新面板/
)
