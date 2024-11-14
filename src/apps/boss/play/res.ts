import { Text, useSend } from 'alemonjs'
// 攻击
export default OnResponse(
  async e => {
    const Send = useSend(e)
    Send(Text('待开放'))
  },
  'message.create',
  /^查看九城三十六郡$/
)
