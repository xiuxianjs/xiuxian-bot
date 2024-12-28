import { Redis } from '@src/xiuxian/db'
import { getConfigValue } from 'alemonjs'
import crypto from 'crypto'
import transporter, { Transporter, SentMessageInfo } from 'nodemailer'
import SMTPPool from 'nodemailer/lib/smtp-pool'

class Email {
  #transporter: Transporter<SentMessageInfo, SMTPPool.Options> | null = null
  #key = 'xiuxian:email:code'

  /**
   * 生产验证码
   * @param length
   * @returns
   */
  generateCaptcha = (length = 6) => {
    return crypto
      .randomInt(0, 10 ** length)
      .toString()
      .padStart(length, '0')
  }

  /**
   * 创建验证码
   * @param uid
   * @param email
   */
  createEmail(uid: string, email: string) {
    const code = this.generateCaptcha()
    // 要进行过期设置？
    Redis.set(`${this.#key}:${uid}:${code}`, email)
    // 发送邮件
    this.send({
      text: '',
      to: email,
      subject: '百里寻晴',
      html: `您的验证码为: ${code}`
    })
  }

  /**
   *
   * @param uid
   * @param code
   * @returns
   */
  delEmail = async (uid: string, code: string) => {
    return await Redis.del(`${this.#key}:${uid}:${code}`)
  }

  /**
   * 得到验证码
   * @param uid
   * @param code
   * @returns
   */
  getEmail = async (uid: string, code: string) => {
    return await Redis.get(`${this.#key}:${uid}:${code}`)
  }

  /**
   *
   * @param param0
   */
  send = ({
    text,
    html,
    to,
    subject
  }: {
    text: string
    html: string
    to: string
    subject: string
  }) => {
    // 进行动态读取。
    const value = getConfigValue()
    const ConfigEMail = value?.email
    // 判断是否已经创建了 transporter
    if (!this.#transporter) {
      this.#transporter = transporter.createTransport(ConfigEMail.options)
    }
    // 发送
    this.#transporter.sendMail(
      {
        // 发件人
        from: `"${ConfigEMail.name}" <${ConfigEMail.options.auth.user}>`,
        to: to, // 收件人
        subject: subject, // 邮件主题
        text: text, // 邮件正文（纯文本）
        html: html // 邮件正文（HTML）
      },
      (error, info) => {
        if (error) {
          return console.log('Error occurred:', error)
        }
        console.log('Email sent:', info.response)
      }
    )
  }
}

export default new Email()
