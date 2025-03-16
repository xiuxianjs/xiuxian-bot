import { Text, useSend } from 'alemonjs'
import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^查看九城三十六郡$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const Send = useSend(e)
    Send(Text('待开放'))
  }
])
