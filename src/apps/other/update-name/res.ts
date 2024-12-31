import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { Control, showUserMsg } from '@xiuxian/api/index'
import { Config, operationLock } from '@xiuxian/core/index'
import { Attributes, user } from '@xiuxian/db/index'
export default OnResponse(
  async (e, next) => {
    if (!/^(#|\/)更改昵称为[\u4e00-\u9fa5]+$/.test(e.MessageText)) {
      next()
      return
    }
    const TT = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = await getEmailUID(e.UserKey)
    const UserData = e['UserData'] as Attributes<typeof user>
    if (!(await Control(e, UserData))) return
    const text = e.MessageText
    const name = text.replace(/^(#|\/)更改昵称为/, '')

    if (Config.IllegalCharacters.test(name)) {
      Send(Text('异常名称'))
      return
    }
    if (name.length == 0) return
    if (name.length > 8) {
      Send(Text('请正确设置\n且道宣最多8字符'))
      return
    }

    //
    await user.update(
      {
        name: name
      },
      {
        where: {
          uid: UID
        }
      }
    )
    setTimeout(() => {
      showUserMsg(e)
    }, 500)
    return
  },
  ['message.create', 'private.message.create']
)
