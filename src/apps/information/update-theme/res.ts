import { Themes } from '@xiuxian/img/index'
import * as GameApi from '@xiuxian/core/index'
import { user } from '@xiuxian/db/index'
import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(
  async e => {
    const TT = await GameApi.operationLock(e.UserId)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = await getEmailUID(e.UserId)

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

    user.update(
      {
        avatar: e.UserAvatar,
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
  },
  'message.create',
  /^(#|\/)(更改|更换)主题$/
)
