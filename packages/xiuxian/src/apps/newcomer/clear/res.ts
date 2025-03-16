import { user } from '@src/xiuxian/db'
import { Text, useSend } from 'alemonjs'

import Xiuxian, { useCurrent, selects } from '@src/apps/index'

export const regular = /^(#|\/)开启(新人)?(指引|教程)$/
export default onResponse(selects, [
  Xiuxian.current,
  e => {
    const UserData = useCurrent(e).UserData
    user.update(
      { newcomer: 0, newcomer_step: 0 },
      { where: { uid: UserData.uid } }
    )
    const Send = useSend(e)
    Send(
      Text(
        [
          '小柠檬：',
          '发送[/我的资料]了解个人信息',
          '发送[/跳过指引]可跳过新人指引'
        ].join('\n')
      )
    )
    return
  }
])
