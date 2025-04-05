import { isSideUser, dualVerification } from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
import { user, user_level } from '@xiuxian/db/index'
import { Text, useMention, useSend } from 'alemonjs'
import Xiuxian, { useCurrent, selects } from '@src/apps/index'
import { isUIDInAddress } from '@src/xiuxian/core/src/system/address'
export const regular = /^(#|\/)?(传功|傳功)/

const response = onResponse(selects, async e => {
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
    const uid = e.MessageText.replace(regular, '').trim()
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

  const LevelDataA = await user_level.findOneValue({
    where: {
      uid: UID,
      type: 1
    }
  })
  const LevelDataB = await user_level.findOneValue({
    where: {
      uid: UIDB,
      type: 1
    }
  })
  if (!LevelDataA || !LevelDataB) return
  if (LevelDataA.realm < 21) {
    Send(Text('未到元婴期'))

    return
  }
  if (LevelDataA.experience <= 2000) {
    Send(Text('所剩修为低于2000'))

    return
  }
  // B的境界相差
  const LevelSize = 9
  if (
    LevelDataB.realm < LevelDataA.realm - LevelSize ||
    LevelDataB.realm > LevelDataA.realm + LevelSize
  ) {
    Send(Text('最多可相差9个境界'))

    return
  }

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

  if (!GameApi.Method.isTrueInRange(1, 100, 85)) {
    // 清空经验
    await GameApi.Levels.reduceExperience(UID, 1, LevelDataA.experience)
    // 掉境界
    await GameApi.Levels.fallingRealm(UID, 1)
    Send(Text('传功失败了,掉落了一个境界！'))
    return
  }

  // 清空经验
  await GameApi.Levels.reduceExperience(UID, 1, LevelDataA.experience)

  // 增加对方经验
  const size = Math.floor(LevelDataA.experience * 0.6)
  await GameApi.Levels.addExperience(UIDB, 1, size)
  Send(Text(`成功传${size}修为给${UIDB}`))

  return
})

export default onResponse(selects, [Xiuxian.current, response.current])
