import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { isUser, endAllWord } from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
export default OnResponse(
  async e => {
    // 操作锁
    const TT = await GameApi.operationLock(e.UserId)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return

    // 已经是打坐了
    if (UserData?.state == 8) {
      Send(Text('打坐中...'))
      return
    }
    // 如果是 闭关 和 降妖
    if (UserData?.state == 1 || UserData?.state == 2) {
      // 调用计算
      await endAllWord(e, UID, UserData)
    }
    // 没有调用计算,而是其他行为
    const { state, msg } = await GameApi.State.Go(UserData)
    if (state == 4001) {
      Send(Text(msg))
      return
    }
    // 切换为打坐
    setTimeout(async () => {
      await GameApi.State.set(UID, {
        actionID: 8,
        startTime: new Date().getTime(), // 记录了现在的时间
        endTime: 9999999999999
      })
      Send(Text('开始打坐...'))
    }, 2000)
    return
  },
  'message.create',
  /^(#|\/)?打坐$/
)
