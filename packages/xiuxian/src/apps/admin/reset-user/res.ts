import { Text, useSend } from 'alemonjs'
import { Player } from '@xiuxian/core/index'
import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^(#|\/)?天道强制重生/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    if (!e.IsMaster) return
    const text = e.MessageText
    if (!text) return
    const UID = text.replace(/(#|\/)天道强制重生/, '')
    const Send = useSend(e)
    const url = (await e.UserAvatar?.toURL()) ?? ''
    Player.updatePlayer(UID, url)
      .then(() => {
        Send(Text('操作完成'))
      })
      .catch(err => {
        console.error('err', err)
        Send(Text('数据查询错误'))
      })
    return
  }
])
