import {
  isSideUser,
  dualVerification,
  victoryCooling
} from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
import { user, user_level } from '@xiuxian/db/index'
import { Text, useMention, useSend } from 'alemonjs'
import Xiuxian, { useCurrent, selects } from '@src/apps/index'
import { isUIDInAddress } from '@src/xiuxian/core/src/system/address'
export const regular = /^(#|\/)?(雙修|双修)/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const Send = useSend(e)
    if (e.name !== 'message.create') {
      Send(Text('请在群聊中使用'))
      return
    }

    // lock start
    const T = await GameApi.operationLock(e.UserKey)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey

    const UserData = useCurrent(e).UserData
    const [mention] = useMention(e)
    const res = await mention.findOne()
    let UIDB: string | null = null
    if (res.code !== 2000) {
      // 不是@机制。则直接正则截取到uid
      const uid = e.MessageText.replace(/^(#|\/)?打劫/, '').trim()
      if (!(await isUIDInAddress(e.ChannelId, uid))) {
        Send(Text('道友不在此处'))
      }
      UIDB = uid
      return
    } else {
      UIDB = res.data
    }
    if (!UIDB || UIDB == '') {
      Send(Text('请@道友'))
      return
    }
    const UserDataB = await isSideUser(e, UIDB)
    if (!UserDataB || typeof UserDataB === 'boolean') {
      Send(Text('此乃凡人'))
      return
    }
    if (!(await dualVerification(e, UserData, UserDataB))) {
      // 判断是否可为
      return
    }

    if (UserData.special_spiritual < 5) {
      Send(Text(`${UserData.immortal_grade > 0 ? '仙力' : '灵力'}不足`))
      return
    }
    if (UserDataB.special_spiritual < 5) {
      Send(Text(`对方${UserDataB.immortal_grade > 0 ? '仙力' : '灵力'}不足`))
      return
    }

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
])
