import { Text, useSend } from 'alemonjs'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)我的编号$/
export default OnResponse(
  async e => {
    const Send = useSend(e)
    Send(Text(e.UserId))
  },
  ['message.create', 'private.message.create']
)
