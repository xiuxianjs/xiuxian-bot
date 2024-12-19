import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { endAllWord } from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
import { Attributes, user } from '@src/xiuxian/db'
export default OnResponse(async (e, next) => {
  if (!/^(#|\/)(锻体|降妖)$/.test(e.MessageText)) {
    next()
    return
  }
  // 操作锁
  const TT = await GameApi.operationLock(e.UserKey)
  const Send = useSend(e)
  if (!TT) {
    Send(Text('操作频繁'))
    return
  }

  const UID = await getEmailUID(e.UserKey)
  const UserData = e['UserData'] as Attributes<typeof user>

  if (UserData.state == 2) {
    Send(Text('锻体中...'))
    return
  }
  if (UserData.state == 1 || UserData.state == 8) {
    //调用计算
    await endAllWord(e, UID, UserData)
  }
  // 其他状态
  const { state, msg } = await GameApi.State.Go(UserData)
  if (state == 4001) {
    Send(Text(msg))
    return
  }
  setTimeout(async () => {
    await GameApi.State.set(UID, {
      actionID: 2,
      startTime: Date.now(), // 记录了现在的时间
      endTime: 9999999999999
    })
    Send(Text('开始爬山越岭,负重前行...'))
  }, 2000)
  return
}, 'message.create')
