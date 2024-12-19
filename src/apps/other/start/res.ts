import { showUserMsg } from '@xiuxian/api/index'
import { user } from '@xiuxian/db/index'
import { operationLock } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(async (e, next) => {
  if (!/^(#|\/)踏入仙途$/.test(e.MessageText)) {
    next()
    return
  }
  // lock start
  const T = await operationLock(e.UserKey)
  const Send = useSend(e)
  if (!T) {
    Send(Text('操作频繁'))
    return
  }

  const UID = await getEmailUID(e.UserKey)

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
}, 'message.create')
