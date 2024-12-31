import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { user } from '@xiuxian/db/index'
import { Text, useSend, useSubscribe } from 'alemonjs'
import { operationLocalLock } from '@src/middleware/util'
import LoginRes from '@src/middleware/login'
import NewsUser from '@src/middleware/newuser'
import { newcomer } from './newcomer'
export default OnMiddleware(
  async (e, next) => {
    // send
    const Send = useSend(e)
    // 本地内存操作锁，防止频繁操作
    const offLocalLock = operationLocalLock(e.UserKey)

    // loack
    if (!offLocalLock) {
      Send(Text('操作频繁'))
      return
    }

    // user id
    const UID = await getEmailUID(e.UserKey)

    if (!UID) {
      Send(Text('尚未登录,请发送[/登录+邮箱地址]进行'))
      // 没有查询到用户邮箱。需要提示用户进行邮箱绑定。
      const [subscribe] = useSubscribe(e, 'message.create')
      // 锁定用户的所有操作？
      subscribe(LoginRes.current, ['UserId'])
      return
    }

    // data
    const data = await user.findOneValue({
      where: {
        uid: UID
      }
    })

    if (!data) {
      Send(Text('数据生成中...'))
      return
    }

    // 不是新手
    if (data.newcomer != 0) {
      // 携带数据
      e['UserData'] = data
      // continue
      next()
      return
    }

    const closeNewComer = () => {
      data.newcomer = 1
      user.update({ newcomer: 1 }, { where: { uid: UID } })
    }

    // 不存步骤
    if (!newcomer[data.newcomer_step]) {
      closeNewComer()

      // 携带数据
      e['UserData'] = data
      // continue
      next()
      return
    }

    if (/^\/(跳过|跳过新手指引|跳过指引)/.test(e.MessageText)) {
      closeNewComer()

      Send(
        Text(
          [
            '小柠檬：',
            '哎呀,我要消失啦～',
            '重新开始可发送[/启动新手指引]'
          ].join('\n')
        )
      )

      return
    }

    // 开始这一步的新手提示。

    Send(
      Text(`小柠檬: 开始新手指引,请发送[${newcomer[data.newcomer_step].msg}]`)
    )

    const [subscribe] = useSubscribe(e, 'message.create')

    // 锁定用户的所有操作？
    subscribe(NewsUser.current, ['UserId'])

    return
  },
  ['message.create', 'private.message.create']
)
