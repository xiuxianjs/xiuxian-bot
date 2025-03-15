import { createSelects, Text, useSend } from 'alemonjs'
export const regular = /^(#|\/)我的编号$/
const selects = createSelects(['message.create', 'private.message.create'])
export default onResponse(selects, async e => {
  const Send = useSend(e)
  Send(Text(e.UserId))
})
