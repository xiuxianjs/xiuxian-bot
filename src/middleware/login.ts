import { Text, useSend, useSubscribe } from 'alemonjs'
import { operationLock } from '@src/xiuxian/core'
import Email from '@src/middleware/email'
import { user, user_email } from '@src/xiuxian/db'
import { updatePlayer } from '@src/xiuxian/core/src/system/player'

const CodeRes = OnResponse(async (e, next) => {
  if (!/^(\/|#)?验证码\d{6}$/.test(e.MessageText)) {
    next()
    return
  }
  // 操作锁
  const offLock = await operationLock(e.UserKey)
  const Send = useSend(e)
  if (!offLock) {
    Send(Text('操作频繁'))
    next()
    return
  }
  // 尝试读取出code
  const match = e.MessageText.match(/\d+/g)
  const code = match ? match[0] : null
  if (!code) {
    next()
    return
  }
  const email = await Email.getEmail(e.UserKey, code)
  if (!email) {
    Send(Text('验证码错误'))
    next()
    return
  }

  Email.delEmail(e.UserKey, code)

  // 先建立索引
  await user_email.create({
    email: email,
    uid: e.UserKey
  } as any)

  // 查看该邮箱是否注册游戏信息。没有则创建。

  const data = await user.findOneValue({
    where: {
      uid: email
    }
  })

  if (!data) {
    // 开始创建存档
    updatePlayer(email)
  }

  // 发送消息
  Send(Text('登录成功'))

  //
}, 'message.create')

const EmailRes = OnResponse(
  async (e, next) => {
    // 每次来的时候。只允许该操作可进行后续。
    if (
      !/^(\/|#)?登录[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/.test(
        e.MessageText
      )
    ) {
      next()
      return
    }
    // 操作锁
    const offLock = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!offLock) {
      Send(Text('操作频繁'))
      return
    }

    // 得到邮箱
    const email = e.MessageText.replace(/^(\/|#)?登录/, '')

    // 创建验证码
    Email.createEmail(e.UserKey, email)

    Send(Text('验证码已发送至邮箱，请查收后回复[/验证码XXXXXX]'))

    // 开始新的询问。
    const [Subscribe] = useSubscribe(e, 'message.create')
    // 锁定用户的所有操作？
    Subscribe(CodeRes.current, ['UserId'])
  },
  ['message.create']
)

export default EmailRes
