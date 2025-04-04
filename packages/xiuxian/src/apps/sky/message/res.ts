import { Image, Text, useSend } from 'alemonjs'
import { showUserMsg } from '@xiuxian/api/index'
import { user, user_sky_ranking } from '@xiuxian/db/index'
import { equipmentInformation } from '@src/xiuxian/statistics'
import Xiuxian, { useCurrent, selects } from '@src/apps/index'
import { renderComponentToBuffer } from 'jsxp'
import XEquipment from '@src/xiuxian/img/src/views/XEquipment'
export const regular = /^(#|\/)?查看通天塔第(\d+)名(资料|面板)?$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UID = e.UserKey
    const UserData = useCurrent(e).UserData
    const Send = useSend(e)
    // 查看数据是否存在
    const data = await user_sky_ranking.findOneValue({
      where: {
        uid: UID
      }
    })

    if (!data) {
      Send(Text('😃未进入'))
      return
    }

    const text = e.MessageText

    // 使用正则表达式匹配数字
    const matches = text.match(/\d+/g)
    const id = matches ? Number(matches[0]) : 0

    if (isNaN(id) || id > 10 || id < 1) {
      Send(Text('请输入1-10之间的数字'))
      return
    }
    //
    const dataB = await user_sky_ranking.findOneValue({
      where: {
        id: id
      }
    })
    //
    if (!dataB) {
      Send(Text('该位置未录入'))
      return
    }

    //
    const UIDB = dataB.uid

    const UserDataB = await user.findOneValue({
      where: {
        uid: UIDB
      }
    })

    if (!UserDataB) {
      Send(Text('该用户不存在'))
      return
    }

    try {
      //
      if (/面板/.test(text)) {
        await equipmentInformation(UIDB).then(async res => {
          const avatar = await e.UserAvatar.toURL()
          renderComponentToBuffer('Equipmentcomponent/' + res.UID, XEquipment, {
            data: res,
            theme: UserData?.theme ?? 'dark',
            avatar: avatar
          }).then(img => {
            if (typeof img != 'boolean') {
              Send(Image(img))
            }
          })
        })
        return
      }

      await showUserMsg({
        ...e,
        UserKey: UIDB
      })

      //
    } catch (err) {
      console.error(err)
    }

    //
  }
])
