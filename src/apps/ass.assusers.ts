import { Op } from 'sequelize'
import { isThereAUserPresent, sendReply } from 'xiuxian-api'
import * as GameApi from 'xiuxian-core'
import * as DB from 'xiuxian-db'
import { Messages } from 'alemonjs'

const message = new Messages()

message.response(/^(#|\/)?势力信息$/, async e => {
  const UID = e.user_id
  if (!(await isThereAUserPresent(e, UID))) return

  // 需要关联外键
  const UserAss = await DB.user_ass
    .findAll({
      where: {
        uid: UID
      },
      include: [
        {
          model: DB.ass,
          include: [
            {
              model: DB.ass_typing
            }
          ]
        }
      ]
    })
    .then(res => res.map(item => item.dataValues))

  if (!UserAss || UserAss?.length == 0) {
    e.reply('未加入任何势力', {
      quote: e.msg_id
    })
    return
  }

  for (const item of UserAss) {
    // 待加入
    if (item.identity == GameApi.Config.ASS_IDENTITY_MAP['9']) {
      e.reply([
        `🏹[${item['ass.name']}]-${item[`ass.ass_typing.${item.identity}`]}`
      ])
    } else {
      e.reply([
        `🏹[${item['ass.name']}]-${item['ass.grade']}`,
        `\n身份:${item[`ass.ass_typing.${item.identity}`]}`,
        `\n灵池:${item[`ass.property`]}`,
        `\n活跃:${item['ass.activation']}`,
        `\n名气:${item['ass.fame']}`,
        `\n贡献:${item['contribute']}`
      ])
    }
  }

  return
})

message.response(/^(#|\/)?查看[\u4e00-\u9fa5]+$/, async e => {
  const UID = e.user_id
  if (!(await isThereAUserPresent(e, UID))) return
  const name = e.msg.replace(/^(#|\/)?查看/, '')
  const v = await GameApi.Ass.v(UID, name)
  if (v == false) return
  if (v == '权能不足') {
    e.reply(v)
    return
  }
  const { aData } = v

  e.reply([
    `🏹[${aData['name']}]-${aData['grade']}`,
    `\n灵池:${aData[`property`]}`,
    `\n活跃:${aData['activation']}`,
    `\n名气:${aData['fame']}`
  ])

  const uData = await DB.user_ass
    .findAll({
      where: {
        aid: aData.id,
        identity: { [Op.ne]: GameApi.Config.ASS_IDENTITY_MAP['9'] }
      },
      include: [
        {
          model: DB.user
        }
      ]
    })
    .then(res => res.map(item => item.dataValues))

  const msg = []

  for (const item of uData) {
    console.log(item)
    msg.push(
      `\n🔹标记:${item.id}_道号[${item['user.name']}]\n身份:${
        aData[`ass_typing.${item.identity}`]
      }_贡献:${item['contribute']}`
    )
  }

  sendReply(e, `🏹[${aData['name']}]-${aData['grade']}`, msg)

  return
})

message.response(/^(#|\/)?势力\d*$/, async e => {
  const UID = e.user_id
  if (!(await isThereAUserPresent(e, UID))) return
  const p = e.msg.replace(/^(#|\/)?势力/, '')
  const page = p == '' ? 1 : Number(p)
  const pageSize = GameApi.Cooling.pageSize
  const totalCount = await DB.ass.count()
  const totalPages = Math.ceil(totalCount / pageSize)
  if (page > totalPages) return
  const AuctionData = await DB.ass
    .findAll({
      limit: GameApi.Cooling.pageSize,
      offset: (page - 1) * GameApi.Cooling.pageSize
    })
    .then(res => res.map(item => item.dataValues))
  const msg: string[] = []
  for (const item of AuctionData) {
    msg.push(
      `\n🏹[${item.name}]-${item.grade ?? 0}\n⚔活跃:${
        item.activation
      }🗡名气:${item.fame}`
    )
  }

  sendReply(e, `___[势力]___(${page}/${totalPages})`, msg)

  return
})

export const AssSser = message.ok