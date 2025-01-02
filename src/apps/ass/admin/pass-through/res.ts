import * as DB from '@xiuxian/db/index'
import * as GameApi from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'

import { AssGradesSize } from '@src/xiuxian/core/src/config/cooling'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)通过\d+$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)通过\d+$/.test(e.MessageText)) {
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

      const UID = e.UserKey
      //
      const text = e.MessageText

      //
      const id = Number(text.replace(/^(#|\/)通过/, ''))

      //
      if (!id) return

      const ID = Number(id)

      if (isNaN(ID)) {
        Send(Text('错误标记..'))
        return
      }

      //
      const uData = await DB.user_ass_apply
        .findOne({
          where: {
            id: ID
          },
          include: [
            {
              model: DB.ass
            }
          ]
        })
        .then(res => res?.dataValues)

      // 不存在该条目
      if (!uData) {
        Send(Text('非待通过编号'))
        return
      }

      const aData = await DB.ass
        .findOne({
          where: {
            name: uData['ass']['dataValues']['name']
          }
        })
        .then(res => res?.dataValues)
        .catch(err => console.error(err))

      // 不存在
      if (!aData) {
        Send(Text('不存在该势力'))
        return false
      }

      //
      const UserAss = await DB.user_ass
        .findOne({
          where: {
            uid: UID, // uid
            aid: aData.id
          }
        })
        .then(res => res?.dataValues)

      // 不存在，或者 9
      if (!UserAss) {
        Send(Text('不属于该宗门'))
        return
      }

      // 大于4
      if (UserAss.authentication >= 4) {
        Send(Text('权能不足'))
        return
      }

      const count = await DB.user_ass.count({
        where: {
          aid: aData.id
        }
      })

      //
      const size = AssGradesSize[aData.grade]

      if (!size || count >= size) {
        Send(Text('人数已达上限'))
        return
      }

      const AssCount = await DB.user_ass.count({
        where: {
          uid: uData.uid
        }
      })

      if (AssCount >= 3) {
        //
        Send(Text('对方已无法加入更多势力'))

        DB.user_ass_apply.destroy({
          where: {
            uid: uData.uid
          }
        })

        return
      }
      // 创建数据
      DB.user_ass
        .create({
          uid: UID,
          authentication: 8,
          identity: GameApi.Config.ASS_IDENTITY_MAP['8']
        })
        .then(() => {
          Send(Text('审核通过'))
        })
        .catch(err => {
          console.error(err)
          Send(Text('审核失败'))
        })

      return
    }
  ],
  ['message.create', 'private.message.create']
)
