import { Text, useSend } from 'alemonjs'
import { controlByName } from '@xiuxian/api/index'
import { Attributes, user } from '@src/xiuxian/db'
import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)炼丹师学徒$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UserData = e['UserData'] as Attributes<typeof user>
    if (!(await controlByName(e, UserData, '协会'))) return
    const Send = useSend(e)
    Send(Text(['[协会执事]😳叶子凡\n', '待开放'].join('')))
  }
])
