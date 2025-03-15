import { Text, useSend } from 'alemonjs'
// 攻击
import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^查看九城三十六郡$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const Send = useSend(e)
    Send(Text('待开放'))
  }
])
