import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { endAllWord } from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
import { Attributes, user } from '@src/xiuxian/db'
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
    const UserData = e['UserData'] as Attributes<typeof user>

    // 已经是闭关了
    if (UserData.state == 1) {
      Send(Text('闭关中...'))
      return
    }
    // 锻体2 聚灵3
    if (UserData.state == 2 || UserData.state == 8) {
      //调用计算
      await endAllWord(e, UID, UserData)
    }
    // 没有调用计算,而是其他行为
    const { state, msg } = await GameApi.State.Go(UserData)
    if (state == 4001) {
      Send(Text(msg))
      return
    }
    setTimeout(async () => {
      await GameApi.State.set(UID, {
        actionID: 1,
        startTime: new Date().getTime(), // 记录了现在的时间
        endTime: 9999999999999 // 结束时间应该是无限的
      })
      Send(Text('开始两耳不闻窗外事...'))
    }, 2000)
    return
  },
  'message.create',
  /^(#|\/)?(闭关|閉關)$/
)
