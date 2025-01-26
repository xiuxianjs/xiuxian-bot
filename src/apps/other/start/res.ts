import { showUserMsg } from '@xiuxian/api/index'
import { user } from '@xiuxian/db/index'
import { operationLock } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'

import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)踏入仙途$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      // lock start
      const T = await operationLock(e.UserKey)
      const Send = useSend(e)
      if (!T) {
        Send(Text('操作频繁'))
        return
      }

      const UID = e.UserKey

      user
        .findOneValue({
          attributes: ['uid'],
          where: { uid: UID }
        })
        .then(res => {
          // 不存在
          if (!res) {
            Send(Text('数据查询错误'))
          } else {
            // 显示资料
            showUserMsg(e)
          }
        })
        .catch(err => {
          console.error('err', err)
          Send(Text('数据查询错误'))
        })

      return
    }
  ],
  ['message.create', 'private.message.create']
)
