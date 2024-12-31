import { Text, useSend } from 'alemonjs'
import { controlByName } from '@xiuxian/api/index'
import { Attributes, user } from '@src/xiuxian/db'
export default OnResponse(
  async (e, next) => {
    if (!/^(#|\/)炼丹师学徒$/.test(e.MessageText)) {
      next()
      return
    }
    const UserData = e['UserData'] as Attributes<typeof user>
    if (!(await controlByName(e, UserData, '协会'))) return
    const Send = useSend(e)
    Send(Text(['[协会执事]😳叶子凡\n', '待开放'].join('')))
  },
  ['message.create', 'private.message.create']
)
