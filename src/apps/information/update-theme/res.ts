import { Themes } from '@xiuxian/img/index'
import * as GameApi from '@xiuxian/core/index'
import { user } from '@xiuxian/db/index'
import { Text, useSend } from 'alemonjs'
import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)(更改|更换)主题$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)(更改|更换)主题$/.test(e.MessageText)) {
        next()
        return
      }
      const TT = await GameApi.operationLock(e.UserKey)
      const Send = useSend(e)
      if (!TT) {
        Send(Text('操作频繁'))
        return
      }

      const UID = e.UserKey

      const UserData = e['UserData']

      // 得到配置
      const index = Themes.indexOf(UserData.theme)

      // 如果存在
      if (Themes[index + 1]) {
        // 切换
        UserData.theme = Themes[index + 1]
        // 保存
      } else {
        // 不存在。返回第一个
        UserData.theme = Themes[0]
      }

      const url = await e.UserAvatar?.toURL()

      user.update(
        {
          avatar: url,
          theme: UserData.theme
        },
        {
          where: {
            uid: UID
          }
        }
      )

      Send(Text('更改成功'))

      //
    }
  ],
  ['message.create', 'private.message.create']
)
