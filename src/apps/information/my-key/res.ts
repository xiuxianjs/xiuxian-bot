import { Text, useSend } from 'alemonjs'
import Xiuxian from '@src/apps/index'
export const regular = /^(#|\/)我的记号$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)我的记号$/.test(e.MessageText)) {
        next()
        return
      }
      const Send = useSend(e)
      Send(Text(e.UserKey))
    }
  ],
  ['message.create', 'private.message.create']
)
