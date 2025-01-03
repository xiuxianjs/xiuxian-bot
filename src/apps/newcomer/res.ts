import { Text, useSend } from 'alemonjs'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
import { user } from '@src/xiuxian/db'
export const regular = /^(\/|#)跳过(指引|教程)/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      // send
      const Send = useSend(e)
      const data = e['UserData']
      const UID = e.UserKey
      if (data.newcomer == 1) {
        next()
        return
      }
      const closeNewComer = () => {
        data.newcomer = 1
        user.update({ newcomer: 1 }, { where: { uid: UID } })
      }
      closeNewComer()
      Send(
        Text(
          ['小柠檬：', '哎呀,我要消失啦～', '重新开始可发送[/启动指引]'].join(
            '\n'
          )
        )
      )
      return
    }
  ],
  ['message.create', 'private.message.create']
)
