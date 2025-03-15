import { sendReply, victoryCooling } from '@xiuxian/api/index'
import * as DB from '@xiuxian/db/index'
import * as GameApi from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'

import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)挑战\d+$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // lock start
    const T = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey

    const UserData = e['UserData'] as DB.Attributes<typeof DB.user>

    const CDID = 23
    const CDTime = GameApi.Cooling.CD_B
    // 冷却
    if (!(await victoryCooling(e, UID, CDID))) return

    // 查看数据是否存在
    const data = await DB.user_sky_ranking
      .findOne({
        where: {
          uid: UID
        }
      })
      .then(res => res?.dataValues)

    if (!data) {
      Send(Text('😃未进入'))
      return
    }

    const text = e.MessageText

    const id = Number(text.replace(/^(#|\/)挑战/, ''))
    if (id >= data.id || id < 1) {
      Send(Text('😅你干嘛'))

      return
    }
    // 设置redis
    GameApi.Burial.set(UID, CDID, CDTime)
    const dataB = await DB.user_sky_ranking
      .findOne({
        where: {
          id: id
        }
      })
      .then(res => res?.dataValues)
    // 如果发现找不到。就说明位置是空的，占领位置。
    if (!dataB) {
      await DB.user_sky_ranking.update(
        {
          id
        },
        {
          where: {
            uid: data.uid
          }
        }
      )
      Send(Text('位置占领成功'))
      return
    }
    const UserDataB = await DB.user
      .findOne({
        where: {
          uid: dataB.uid
        }
      })
      .then(res => res?.dataValues)
    if (!UserDataB) {
      // 不存在该用户了
      await DB.user_sky_ranking.update(
        {
          id
        },
        {
          where: {
            uid: data.uid
          }
        }
      )
      Send(Text('位置占领成功'))
      return
    }

    const BMSG = GameApi.Fight.start(UserData, UserDataB)
    // 是否显示战斗结果
    if (UserData.battle_show || UserDataB.battle_show) {
      // 切割战斗信息
      sendReply(Send, '[战斗结果]', BMSG.msg)
    }
    if (BMSG.victory == '0') {
      Send(Text('🤪挑战失败,你与对方打成了平手'))
      // 反馈战斗信息

      return
    }
    if (BMSG.victory != UID) {
      Send(Text('🤪挑战失败,你被对方击败了'))

      return
    }
    //
    await DB.user_sky_ranking.update(
      {
        // 自身的 uid
        uid: data.uid
      },
      {
        where: {
          // 目标 id
          id: dataB.id
        }
      }
    )
    //
    await DB.user_sky_ranking.update(
      {
        // 对方的
        uid: dataB.uid
      },
      {
        where: {
          // 自身的 id
          id: data.id
        }
      }
    )
    //
    Send(Text(`😶挑战成功,当前排名${id}`))
  }
])
