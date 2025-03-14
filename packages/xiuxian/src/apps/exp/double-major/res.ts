import {
  isSideUser,
  dualVerification,
  dualVerificationAction,
  victoryCooling
} from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
import { Attributes, user, user_level } from '@xiuxian/db/index'
import { Text, useMention, useSend } from 'alemonjs'

import Xiuxian from '@src/apps/index'

export const regular = /^(#|\/)(雙修|双修)/
export default OnResponse(
  [
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
      const UserData = e['UserData'] as Attributes<typeof user>
      const ats = await useMention(e)
      let UIDB: null | undefined | string = null
      if (!ats || ats.length === 0) {
        const text = e.MessageText
        UIDB = text.replace(/^(#|\/)(雙修|双修)/, '')
      } else {
        const value = ats.find(item => !item.IsBot)
        if (value) {
          UIDB = value.UserKey
        }
      }
      if (!UIDB || UIDB == '') return
      //
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
      const CDTime = GameApi.Cooling.CD_transmissionPower
      if (!(await victoryCooling(e, UID, CDID))) return

      GameApi.Burial.set(UID, CDID, CDTime)

      // 读取境界
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
      const sizeB = LevelDataB.experience * 0.1
      const expA = sizeA > 648 ? 648 : sizeA
      const expB = sizeB > 648 ? 648 : sizeB

      await user.update(
        {
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
          special_spiritual: UserDataB.special_spiritual - 5
        },
        {
          where: {
            uid: UIDB
          }
        }
      )

      const exA = Math.floor((expA * (UserData.talent_size + 100)) / 100),
        exB = Math.floor((expB * (UserDataB.talent_size + 100)) / 100)
      const eA = exA < 3280 ? exA : 3280,
        eB = exB < 3280 ? exB : 3280

      await GameApi.Levels.addExperience(UID, 1, eA)
      await GameApi.Levels.addExperience(UIDB, 1, eB)

      Send(
        Text(
          [
            '❤️',

            '情投意合~\n',

            `你激动的修为增加了${eA}~\n`,

            `对方奇怪的修为增加了${eB}`
          ].join('')
        )
      )

      return
    }
  ],
  ['message.create', 'private.message.create']
)
