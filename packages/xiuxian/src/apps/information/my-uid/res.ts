import { Text, useSend } from 'alemonjs'
export const regular = /^(#|\/)?我的编号$/
import { selects } from '@src/apps/index'
export default onResponse(selects, async e => {
  const Send = useSend(e)
  Send(Text(e.UserId))
})
