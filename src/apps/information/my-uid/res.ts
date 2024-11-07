import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(
  async e => {
    const Send = useSend(e)
    Send(Text(e.UserId))
  },
  'message.create',
  /^(#|\/)?我的编号$/
)
