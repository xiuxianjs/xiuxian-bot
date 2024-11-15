import { Image, Text, useParse, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { isUser, showUserMsg } from '@xiuxian/api/index'
import { user, user_sky_ranking } from '@xiuxian/db/index'
import { Equipment, Skills } from '@src/xiuxian/core'
import { equipmentInformation } from '@src/xiuxian/statistics'
import { pictureRender } from '@src/xiuxian/img'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return
    const Send = useSend(e)
    // 查看数据是否存在
    const data = await user_sky_ranking
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

    const text = useParse(e.Megs, 'Text')

    // 使用正则表达式匹配数字
    const matches = text.match(/\d+/g)
    const id = matches ? Number(matches[0]) : 0

    if (isNaN(id) || id > 10 || id < 1) {
      Send(Text('请输入1-10之间的数字'))
      return
    }
    //
    const dataB = await user_sky_ranking
      .findOne({
        where: {
          id: id
        }
      })
      .then(res => res?.dataValues)
    //
    if (!dataB) {
      Send(Text('该位置未录入'))
      return
    }

    //
    const UIDB = dataB.uid

    const UserDataB = await user
      .findOne({
        where: {
          uid: UIDB
        }
      })
      .then(res => res?.dataValues)

    if (!UserDataB) {
      Send(Text('该用户不存在'))
      return
    }

    try {
      //
      if (/面板/.test(text)) {
        await equipmentInformation(UIDB).then(res => {
          pictureRender('Equipmentcomponent', {
            data: res,
            theme: UserData?.theme ?? 'dark'
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
        UserId: UIDB,
        UserAvatar: undefined
      })

      //
    } catch (err) {
      console.error(err)
    }

    //
  },
  'message.create',
  /^(#|\/)?查看通天塔第(\d+)名(资料|面板)?$/
)
