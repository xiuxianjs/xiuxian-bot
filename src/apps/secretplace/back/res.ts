import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import * as GameApi from '@xiuxian/core/index'
import { Attributes, user } from '@src/xiuxian/db'
export default OnResponse(
  async (e, next) => {
    if (!/^(#|\/)返回$/.test(e.MessageText)) {
      next()
      return
    }
    const TT = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = await getEmailUID(e.UserKey)
    const UserData = e['UserData'] as Attributes<typeof user>

    // 不是赶路状态
    if (UserData.state == 3) {
      // 取消行为
      const id = await GameApi.Place.get(UID)
      if (id) clearTimeout(id)
      // 清除行为
      GameApi.move.cancelJob(UID)
      Send(Text('已取消赶路'))
      return
    }
    if (UserData.state == 4) {
      await GameApi.State.del(UID)
      // 取消行为
      const id = await GameApi.Place.get(UID)
      if (id) {
        clearTimeout(id)
      }
      Send(Text('已取消传送'))
      return
    }
    return
  },
  ['message.create', 'private.message.create']
)
