import { Text, useSend } from 'alemonjs'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)我的账号$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const Send = useSend(e)
      Send(Text(e.UserKey))
    }
  ],
  ['message.create', 'private.message.create']
)
