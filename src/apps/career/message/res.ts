import { Text, useSend } from 'alemonjs'
import { ControlByBlood } from '@xiuxian/api/index'
import { Attributes, user } from '@src/xiuxian/db'
import Xiuxian from '@src/apps/index'
export const regular = /^(#|\/)我的协会$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)我的协会$/.test(e.MessageText)) {
        next()
        return
      }
      const UserData = e['UserData'] as Attributes<typeof user>
      if (!(await ControlByBlood(e, UserData))) return
      const Send = useSend(e)
      Send(Text('[协会执事]😳叶子凡\n暂未开放...'))
    }
  ],
  ['message.create', 'private.message.create']
)
