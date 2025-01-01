import { Text, useSend } from 'alemonjs'
import { controlByName } from '@xiuxian/api/index'
import { Attributes, user } from '@src/xiuxian/db'
import Xiuxian from '@src/apps/index'
export const regular = /^(#|\/)炼器师学徒$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)炼器师学徒$/.test(e.MessageText)) {
        next()
        return
      }
      const UserData = e['UserData'] as Attributes<typeof user>
      if (!(await controlByName(e, UserData, '协会'))) return
      const Send = useSend(e)
      Send(Text(['[协会执事]😳叶子凡\n', '目前职业炼丹师\n'].join('')))
    }
  ],
  ['message.create', 'private.message.create']
)
