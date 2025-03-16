import { Text, useSend } from 'alemonjs'

import { user } from '@src/xiuxian/db'
export const regular = /^(\/|#)跳过(指引|教程)/

import Xiuxian, { selects } from '@src/apps/index'
export default onResponse(selects, [
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
        ['小柠檬：', '哎呀,我要消失啦～', '重新开始可发送[/开启指引]'].join(
          '\n'
        )
      )
    )
    return
  }
])
