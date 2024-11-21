import { Text, useParse, useSend } from 'alemonjs'
import { Player } from '@xiuxian/core/index'
export default OnResponse(
  async e => {
    if (!e.IsMaster) return
    const text = useParse(e.Megs, 'Text')
    if (!text) return
    const UID = text.replace(/(#|\/)?天道强制重生/, '')
    const Send = useSend(e)
    Player.updatePlayer(UID, e.UserAvatar)
      .then(() => {
        Send(Text('操作完成'))
      })
      .catch(err => {
        console.error('err', err)
        Send(Text('数据查询错误'))
      })
    return
  },
  'message.create',
  /^(#|\/)?天道强制重生/
)
