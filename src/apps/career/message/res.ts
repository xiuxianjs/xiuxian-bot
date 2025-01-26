import { Text, useSend } from 'alemonjs'
import { ControlByBlood } from '@xiuxian/api/index'
import { Attributes, user } from '@src/xiuxian/db'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)我的协会$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const UserData = e['UserData'] as Attributes<typeof user>
      if (!(await ControlByBlood(e, UserData))) return
      const Send = useSend(e)
      Send(Text('[协会执事]😳叶子凡\n暂未开放...'))
    }
  ],
  ['message.create', 'private.message.create']
)
