import { Text, useSend } from 'alemonjs'

import { endAllWord } from '@xiuxian/api/index'
import { Status, operationLock } from '@xiuxian/core/index'
import { Attributes, user } from '@src/xiuxian/db'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)(闭关|閉關)$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)(闭关|閉關)$/.test(e.MessageText)) {
        next()
        return
      }
      // 操作锁
      const TT = await operationLock(e.UserKey)
      const Send = useSend(e)
      if (!TT) {
        Send(Text('操作频繁'))
        return
      }

      const UID = e.UserKey
      const UserData = e['UserData'] as Attributes<typeof user>

      if (Status.getStatus(UserData, 'biguan').status == 200) {
        Send(Text('闭关中...'))
        return
      }

      if (
        Status.getStatus(UserData, 'duanti').status == 200 ||
        Status.getStatus(UserData, 'dazuo').status == 200
      ) {
        await endAllWord(e, UID, UserData)
      }

      // 不是空闲
      const status = Status.getStatus(UserData, 'kongxian')
      if (status.status != 200) {
        Send(Text(status.message))
        return
      }

      Send(Text('开始两耳不闻窗外事...'))

      Status.setStatus({
        UID,
        key: 'biguan'
      })

      return
    }
  ],
  ['message.create', 'private.message.create']
)
