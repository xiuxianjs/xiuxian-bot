import { operationLock, Status } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import { user_group, user_group_list } from '@src/xiuxian/db'

import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)加入队伍\d+$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)加入队伍\d+$/.test(e.MessageText)) {
        next()
        return
      }
      const TT = await operationLock(e.UserKey)
      const Send = useSend(e)
      if (!TT) {
        Send(Text('操作频繁'))
        return
      }

      const UID = e.UserKey

      const groupList = await user_group_list.findOneValue({
        where: {
          uid: UID
        }
      })

      if (groupList) {
        Send(Text('已有归属队伍'))
        return
      }

      const text = e.MessageText
      const p = text.replace(/^(#|\/)加入队伍/, '')
      const id = p == '' ? 1 : Number(p)

      //
      const group = await user_group.findOneValue({
        where: {
          id: id
        }
      })

      if (!group) {
        Send(Text('未知队伍'))
        return
      }

      if (group.lock != 1) {
        Send(Text('该队伍不允许加入'))
        return
      }

      const groupListCount = await user_group_list.count({
        where: {
          gid: group.id
        }
      })

      if (groupListCount >= 4) {
        Send(Text('队伍已满'))
        return
      }

      user_group_list
        .create({
          gid: group.id,
          uid: UID
        })
        .catch(console.error)

      Status.setStatus({ UID, key: 'zudui' })

      Send(Text('加入成功'))

      //
    }
  ],
  ['message.create', 'private.message.create']
)
