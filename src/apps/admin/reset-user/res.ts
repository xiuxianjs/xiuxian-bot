import { Text, useSend } from 'alemonjs'
import { Player } from '@xiuxian/core/index'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)天道强制重生/
export default OnResponse(
  [
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
  ],
  ['message.create', 'private.message.create']
)
