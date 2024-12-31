import { Text, useSend } from 'alemonjs'
import { Player } from '@xiuxian/core/index'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)天道强制重生/.test(e.MessageText)) {
      next()
      return
    }
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
  },
  ['message.create', 'private.message.create']
)
