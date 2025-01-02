import { operationLock, Status } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import { Attributes, user, user_group, user_group_list } from '@src/xiuxian/db'

import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)创建队伍$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)创建队伍$/.test(e.MessageText)) {
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
      const group = await user_group_list.findOneValue({
        where: {
          uid: UID
        }
      })
      if (group) {
        Send(Text('已有归属队伍'))
        return
      }
      const UserData = e['UserData'] as Attributes<typeof user>
      user_group
        .create({
          uid: UID,
          name: `${UserData.name}的队伍`
        })
        .then(res => {
          user_group_list.create({
            gid: res.dataValues.id,
            uid: UID
          })
          Status.setStatus({ UID, key: 'zudui' })
          Send(Text(`创建[${res.dataValues.id}]${UserData.name}的队伍`))
        })
        .catch(logger.error)

      return
    }
  ],
  ['message.create', 'private.message.create']
)
