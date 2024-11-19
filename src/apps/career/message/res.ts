import { Text, useSend } from 'alemonjs'
import { ControlByBlood } from '@xiuxian/api/index'
import { Attributes, user } from '@src/xiuxian/db'
export default OnResponse(
  async e => {
    const UserData = e['UserData'] as Attributes<typeof user>
    if (!(await ControlByBlood(e, UserData))) return
    const Send = useSend(e)
    Send(Text('[协会执事]😳叶子凡\n暂未开放...'))
  },
  'message.create',
  /^(#|\/)?我的协会$/
)
