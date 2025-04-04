import { Text, useSend } from 'alemonjs'
import { endAllWord } from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'

import Xiuxian, { useCurrent, selects } from '@src/apps/index'

export const regular = /^(#|\/)?打坐$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // 操作锁
    const TT = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey
    const UserData = useCurrent(e).UserData

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
        startTime: Date.now(), // 记录了现在的时间
        endTime: 9999999999999
      })
      Send(Text('开始打坐...'))
    }, 2000)
    return
  }
])
