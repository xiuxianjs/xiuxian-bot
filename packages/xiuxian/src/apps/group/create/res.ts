import { operationLock, Status } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import { user_group, user_group_list } from '@src/xiuxian/db'
import Xiuxian, { useCurrent, selects } from '@src/apps/index'
export const regular = /^(#|\/)?创建队伍$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
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
    const UserData = useCurrent(e).UserData
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
])
