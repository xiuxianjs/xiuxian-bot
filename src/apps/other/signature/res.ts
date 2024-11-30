import { Text, useParse, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { Control, showUserMsg } from '@xiuxian/api/index'
import { Config, operationLock } from '@xiuxian/core/index'
import { Attributes, user } from '@xiuxian/db/index'
export default OnResponse(
  async e => {
    const TT = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = await getEmailUID(e.UserId)
    const UserData = e['UserData'] as Attributes<typeof user>
    if (!(await Control(e, UserData))) return

    // 解析文本
    const text = useParse(e.Megs, 'Text')
    const autograph = text.replace(/^(#|\/)更改签名为/, '')

    // 非法字符
    if (Config.IllegalCharacters.test(autograph)) {
      Send(Text('异常签名'))
      return
    }
    // 长度限制
    if (autograph.length == 0 || autograph.length > 50) {
      Send(Text('请正确设置\n且道宣最多50字符'))
      return
    }

    // 更新用户
    await user.update(
      { autograph: autograph },
      {
        where: {
          uid: UID
        }
      }
    )
    //
    setTimeout(() => {
      showUserMsg(e)
    }, 500)
    return
  },
  'message.create',
  /^(#|\/)更改签名为[\u4e00-\u9fa5]+$/
)
