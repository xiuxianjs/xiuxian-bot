import {
  sendReply,
  dualVerification,
  dualVerificationAction,
  isSideUser,
  victoryCooling
} from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
import { Attributes, user, user_level } from '@xiuxian/db/index'
import { Text, useParse, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(
  async e => {
    // lock start
    const T = await GameApi.operationLock(e.UserId)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }

    const UID = await getEmailUID(e.UserId)

    const UserData = e['UserData'] as Attributes<typeof user>

    const ats = useParse(e.Megs, 'At')
    let UIDB = null
    if (!ats || ats.length === 0) {
      const text = useParse(e.Megs, 'Text')
      UIDB = text.replace(/^(#|\/)?(决斗|比鬥)/, '')
    } else {
      const d = ats.find(item => item?.typing === 'user' && !item.bot)
      UIDB = d?.value
    }

    if (!UIDB) return
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
      sendReply(e, '[战斗结果]', BMSG.msg)
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
  'message.create',
  /^(#|\/)?(决斗|比鬥)/
)
