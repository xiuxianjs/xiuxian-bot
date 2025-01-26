import { Text, useSend } from 'alemonjs'
// 攻击
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^查看九城三十六郡$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const Send = useSend(e)
      Send(Text('待开放'))
    }
  ],
  ['message.create', 'private.message.create']
)
