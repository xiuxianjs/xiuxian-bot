import { Text, useSend } from 'alemonjs'
import { controlByName } from '@xiuxian/api/index'
import { Attributes, user } from '@src/xiuxian/db'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)炼丹师学徒$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const UserData = e['UserData'] as Attributes<typeof user>
      if (!(await controlByName(e, UserData, '协会'))) return
      const Send = useSend(e)
      Send(Text(['[协会执事]😳叶子凡\n', '待开放'].join('')))
    }
  ],
  ['message.create', 'private.message.create']
)
