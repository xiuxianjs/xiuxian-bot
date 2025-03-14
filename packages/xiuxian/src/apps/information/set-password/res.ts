import { Text, useSend } from 'alemonjs'

import * as DB from '@xiuxian/db/index'
import { operationLock } from '@src/xiuxian/core'
import Xiuxian from '@src/apps/index'

export const regular = /^(#|\/)设置密码/
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

      // 获取用户信息
      const UID = e.UserKey
      // 解析密码
      const text = e.MessageText
      const password = text.replace(/^(#|\/)设置密码/, '')
      const regex = /^[a-zA-Z0-9]+$/

      if (!regex.test(password)) {
        Send(Text('密码必须只包含数字或字母'))
        return
      } else if (password.length < 6 || password.length > 22) {
        Send(Text('密码大于6位或小于22位'))
        return
      } else {
        // 更新用户密码
        DB.user
          .update(
            {
              password: password
            },
            {
              where: {
                uid: UID
              }
            }
          )
          .then(res => {
            if (res.includes(0)) {
              Send(Text('设置错误'))
            } else {
              Send(Text('设置成功'))
            }
          })
          .catch(err => {
            console.error(err)
            Send(Text('设置错误'))
          })
      }
      return
    }
  ],
  ['message.create', 'private.message.create']
)
