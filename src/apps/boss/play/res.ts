import { Text, useSend } from 'alemonjs'
// 攻击
export default OnResponse(
  async (e, next) => {
    if (!/^查看九城三十六郡$/.test(e.MessageText)) {
      next()
      return
    }
    const Send = useSend(e)
    Send(Text('待开放'))
  },
  ['message.create', 'private.message.create']
)
