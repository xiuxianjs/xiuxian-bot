import { Text, useSend } from 'alemonjs'
import * as GameApi from '@xiuxian/core/index'
export default OnResponse(
  async e => {
    const T = await GameApi.operationLock(e.UserId)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    return
  },
  'message.create',
  /^(#|\/)?挑战妖塔$/
)
