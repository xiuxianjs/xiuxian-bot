import {
  sendReply,
  dualVerification,
  dualVerificationAction,
  isSideUser,
  victoryCooling
} from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
import { Attributes, user, user_level } from '@xiuxian/db/index'
import { Text, useMention, useSend } from 'alemonjs'

import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)(决斗|比鬥)/.test(e.MessageText)) {
      next()
      return
    }
    // lock start
    const T = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey

    const UserData = e['UserData'] as Attributes<typeof user>

    const ats = await useMention(e)
    let UIDB: null | undefined | string = null
    if (!ats || ats.length === 0) {
      const text = e.MessageText
      UIDB = text.replace(/^(#|\/)(决斗|比鬥)/, '')
    } else {
      const value = ats.find(item => !item.IsBot)
      if (value) {
        UIDB = value.UserKey
      }
    }
    if (!UIDB || UIDB == '') return
    const UserDataB = await isSideUser(e, UIDB)
    if (!UserDataB || typeof UserDataB === 'boolean') return
    if (!(await dualVerification(e, UserData, UserDataB))) return

    if (UserData.special_spiritual < 5) {
      Send(Text(`${UserData.immortal_grade > 0 ? '仙力' : '灵力'}不足`))
      return
    }
    if (UserDataB.special_spiritual < 5) {
      Send(Text(`对方${UserDataB.immortal_grade > 0 ? '仙力' : '灵力'}不足`))
      return
    }

    if (!dualVerificationAction(e, UserData.point_type, UserDataB.point_type))
      return
    const CDID = 14
    const CDTime = GameApi.Cooling.CD_Ambiguous
    if (!(await victoryCooling(e, UID, CDID))) return

    GameApi.Burial.set(UID, CDID, CDTime)

    const BMSG = GameApi.Fight.start(UserData, UserDataB)

    /**
     * 是否显示战斗结果
     */
    if (UserData.battle_show || UserDataB.battle_show) {
      sendReply(Send, '[战斗结果]', BMSG.msg)
    }

    Send(
      Text(
        [
          `你的🩸${BMSG.battle_blood_now.a}`,
          `对方🩸${BMSG.battle_blood_now.b}`
        ].join('\n')
      )
    )

    const LevelDataA = await user_level.findOneValue({
      where: {
        uid: UID,
        type: 1
      }
    })

    //
    const LevelDataB = await user_level.findOneValue({
      where: {
        uid: UIDB,
        type: 1
      }
    })

    const sizeA = LevelDataA.experience * 0.15
    const sizeB = LevelDataB.experience * 0.1 // 被动的
    const expA = sizeA > 648 ? 648 : sizeA
    const expB = sizeB > 648 ? 648 : sizeB

    await user.update(
      {
        battle_blood_now: BMSG.battle_blood_now.a,
        special_spiritual: UserData.special_spiritual - 5
      },
      {
        where: {
          uid: UID
        }
      }
    )

    await user.update(
      {
        battle_blood_now: BMSG.battle_blood_now.b,
        special_spiritual: UserDataB.special_spiritual - 5
      },
      {
        where: {
          uid: UIDB
        }
      }
    )

    const exA = Math.floor((expA * (UserDataB.talent_size + 100)) / 100),
      exB = Math.floor((expB * (UserDataB.talent_size + 100)) / 100)
    const eA = exA < 3280 ? exA : 3280,
      eB = exB < 3280 ? exB : 3280

    await GameApi.Levels.addExperience(UID, 2, eA)
    await GameApi.Levels.addExperience(UIDB, 2, eB)

    Send(
      Text(
        [
          '🤺🤺经过一番畅快的决斗~',
          `你激昂的气血增加了${eA}~`,
          `对方坚毅的气血增加了${eB}`
        ].join('\n')
      )
    )

    return
  },
  ['message.create', 'private.message.create']
)
