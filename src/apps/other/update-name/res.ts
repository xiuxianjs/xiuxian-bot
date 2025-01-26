import { Text, useSend } from 'alemonjs'

import { Control, showUserMsg } from '@xiuxian/api/index'
import { Config, operationLock } from '@xiuxian/core/index'
import { Attributes, user } from '@xiuxian/db/index'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)更改昵称为[\u4e00-\u9fa5]+$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const TT = await operationLock(e.UserKey)
      const Send = useSend(e)
      if (!TT) {
        Send(Text('操作频繁'))
        return
      }

      const UID = e.UserKey
      const UserData = e['UserData'] as Attributes<typeof user>
      if (!(await Control(e, UserData))) return
      const text = e.MessageText
      const name = text.replace(/^(#|\/)更改昵称为/, '')

      if (Config.IllegalCharacters.test(name)) {
        Send(Text('异常名称'))
        return
      }
      if (name.length == 0) return
      if (name.length > 8) {
        Send(Text('请正确设置\n且道宣最多8字符'))
        return
      }

      //
      await user.update(
        {
          name: name
        },
        {
          where: {
            uid: UID
          }
        }
      )
      setTimeout(() => {
        showUserMsg(e)
      }, 500)
      return
    }
  ],
  ['message.create', 'private.message.create']
)
