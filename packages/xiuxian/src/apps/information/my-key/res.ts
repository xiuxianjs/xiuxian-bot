import { Text, useSend } from 'alemonjs'

export const regular = /^(#|\/)我的账号$/
export default OnResponse(
  async e => {
    const Send = useSend(e)
    Send(Text(e.UserKey))
  },
  ['message.create', 'private.message.create']
)
