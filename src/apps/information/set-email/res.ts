import * as DB from '@xiuxian/db/index'
import { operationLock } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(async (e, next) => {
  if (!/^(#|\/)设置邮箱/.test(e.MessageText)) {
    next()
    return
  }
  const TT = await operationLock(e.UserKey)
  const Send = useSend(e)
  if (!TT) {
    Send(Text('操作频繁'))
    return
  }

  const UID = await getEmailUID(e.UserKey)

  const text = e.MessageText

  const email = text.replace(/^(#|\/)设置邮箱/, '')
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!regex.test(email)) {
    Send(Text('非法格式'))
    return
  } else {
    // 查询

    const res = await DB.user
      .findOne({
        where: {
          email: email
        }
      })
      .then(res => res?.dataValues)
      .then(res => {
        if (res) {
          Send(Text('已被使用'))
          return false
        }
        return true
      })
      .catch(err => {
        console.error(err)
        Send(Text('数据错误'))
        return false
      })

    if (!res) return

    // 更新信息
    DB.user
      .update(
        {
          email: email
        },
        {
          where: {
            uid: UID
          }
        }
      )
      .then(res => {
        if (res.includes(0)) {
          Send(Text('设置错误'))
        } else {
          Send(Text('设置成功'))
        }
      })
      .catch(err => {
        console.error(err)
        Send(Text('数据错误'))
      })
  }
  return
}, 'message.create')
