import { generateCaptcha, sendEmail } from '@src/xiuxian/core/src/system/email'
import { Redis, email as Email } from '@src/xiuxian/db'
import { user_email } from '@src/xiuxian/db/src/models/user/user_email'
import { Text, useOberver, useParse, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'

/**
 *
 * @param uid
 * @param email
 * @param Send
 */
const createCode = ({ uid, email, Send }) => {
  const code = generateCaptcha()
  Redis.set(`xiuxian:email:code:${uid}`, code)
  sendEmail({
    text: '',
    to: email,
    subject: '百里寻晴',
    html: `您的验证码为: ${code}`
  })
  console.log('code', code)
  Send(
    Text(
      [
        `已向您的邮箱 ${email} 发送验证码，`,
        '请注意查收并回复【/验证码XXXXXX】',
        '若取消验证请发送【/取消验证码】',
        '若重新验证请发送【/重置验证码】'
      ].join('\n')
    )
  )
}

export default OnResponse(
  async e => {
    const UID = e.UserId
    const txt = useParse(e.Megs, 'Text')
    const email = txt.replace(/^(\/|#)?绑定邮箱/, '')
    const Send = useSend(e)
    //
    if (!email || email == '') {
      Send(Text('输入的邮箱错误'))
      return
    }
    createCode({ uid: UID, email, Send })
    //
    const Oberver = useOberver(e, 'message.create')
    //
    Oberver(
      async (e, { next }) => {
        //
        const UID = await getEmailUID(e.UserId)
        const txt = useParse(e.Megs, 'Text')
        const Send = useSend(e)
        if (/取消验证码/.test(txt)) {
          return
        } else if (/重置验证码/.test(txt)) {
          createCode({ uid: UID, email, Send })
          next()
          return
        } else {
          // 尝试读取出code
          const match = txt.match(/\d+/g)
          const code = match ? match[0] : null
          if (!code) {
            next()
            return
          }

          // 验证code
          const c = await Redis.get(`xiuxian:email:code:${UID}`)

          if (c !== code) {
            Send(Text('验证码错误'))
            return
          }

          // 查找映射
          Email.findOne({
            where: {
              email
            }
          })
            .then(res => res?.dataValues)
            .then(res => {
              //
              if (!res) {
                // 不存在
                Email.create({
                  uid: UID,
                  email
                })
              } else {
                Email.update(
                  {
                    uid: UID
                  },
                  {
                    where: {
                      email
                    }
                  }
                )
              }
            })
            .catch(console.error)
          // 正确。输入映射。
          user_email
            .findOne({
              where: {
                uid: UID
              }
            })
            .then(res => res?.dataValues)
            .then(res => {
              if (!res) {
                // 不存在
                user_email.create({
                  uid: UID,
                  email
                })
              } else {
                // 存在，更新
                user_email.update(
                  {
                    email
                  },
                  {
                    where: {
                      uid: UID
                    }
                  }
                )
              }
            })
            .then(() => {
              Send(Text('邮箱绑定成功'))
            })
            .catch(console.error)
        }
      },
      ['UserId']
    )
  },
  'message.create',
  /^(\/|#)?绑定邮箱[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/
)
