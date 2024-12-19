import { Text, useSend } from 'alemonjs'
export default OnResponse(async (e, next) => {
  if (!/^(#|\/)我的编号$/.test(e.MessageText)) {
    next()
    return
  }
  const Send = useSend(e)
  Send(Text(e.UserKey))
}, 'message.create')
