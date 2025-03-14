import { Text, useSend } from 'alemonjs'

export const regular = /^(#|\/)我的编号$/
export default OnResponse(
  async e => {
    const Send = useSend(e)
    Send(Text(e.UserId))
  },
  ['message.create', 'private.message.create']
)
