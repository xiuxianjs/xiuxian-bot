import { Image, Text, useSend } from 'alemonjs'

import { showUserMsg } from '@xiuxian/api/index'
import { Attributes, user, user_sky_ranking } from '@xiuxian/db/index'
import { equipmentInformation } from '@src/xiuxian/statistics'
import { pictureRender } from '@src/xiuxian/img'
import Xiuxian from '@src/apps/index'

export const regular = /^(#|\/)查看通天塔第(\d+)名(资料|面板)?$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const UID = e.UserKey
      const UserData = e['UserData'] as Attributes<typeof user>
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

      const text = e.MessageText

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
          await equipmentInformation(UIDB).then(async res => {
            const avatar = await e.UserAvatar.toURL()
            pictureRender('Equipmentcomponent', {
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
  ],
  ['message.create', 'private.message.create']
)
