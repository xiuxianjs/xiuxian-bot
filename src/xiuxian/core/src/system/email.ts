import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer'
import { getConfig } from 'alemonjs'
import SMTPPool from 'nodemailer/lib/smtp-pool'
import crypto from 'crypto'
import { email, user_email } from '@src/xiuxian/db'

const config = getConfig()
const ConfigEMail = config.value?.email

// 创建可重用的传输器对象，使用 SMTP 协议
let transporter: Transporter<SentMessageInfo, SMTPPool.Options> = null

export const sendEmail = ({
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
  if (!transporter) {
    transporter = nodemailer.createTransport(ConfigEMail.options)
  }
  transporter.sendMail(
    {
      from: `"${ConfigEMail.name}" <${ConfigEMail.options.auth.user}>`, // 发件人
      to: to, // 收件人
      subject: subject, // 邮件主题
      text: text, // 邮件正文（纯文本）
      html: html // 邮件正文（HTML）
    },
    (error: any, info: any) => {
      if (error) {
        return console.log('Error occurred:', error)
      }
      console.log('Email sent:', info.response)
    }
  )
}

/**
 *
 * @param length
 * @returns
 */
export const generateCaptcha = (length = 6) => {
  return crypto
    .randomInt(0, 10 ** length)
    .toString()
    .padStart(length, '0')
}

/**
 *
 * @param uid
 * @returns
 */
export const getEmailUID = async (uid: string) => {
  return await user_email
    .findOne({
      where: {
        uid
      }
    })
    .then(res => res?.dataValues)
    .then(async res => {
      if (res) {
        return await email
          .findOne({
            where: {
              email: res.email
            }
          })
          .then(res => res?.dataValues)
          .then(res => res.uid)
          .catch(() => uid)
      }
      return uid
    })
    .catch(() => uid)
}
