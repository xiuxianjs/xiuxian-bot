import { Text, useSend } from 'alemonjs'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)我的编号$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)我的编号$/.test(e.MessageText)) {
        next()
        return
      }
      const Send = useSend(e)
      Send(Text(e.UserId))
    }
  ],
  ['message.create', 'private.message.create']
)
