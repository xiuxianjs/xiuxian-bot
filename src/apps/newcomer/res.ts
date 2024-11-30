import { Attributes, user } from '@src/xiuxian/db'
import { Text, useSend } from 'alemonjs'
export default OnResponse(
  async e => {
    const UserData = e['UserData'] as Attributes<typeof user>
    user.update(
      { newcomer: 0, newcomer_step: 0 },
      { where: { uid: UserData.id } }
    )
    const Send = useSend(e)
    Send(
      Text(
        [
          '小柠檬：',
          '欢迎来到<史上第一掌门>系统',
          '我是你的萌新助手',
          '接下来跟随我的指引',
          '学习如何踏入仙途吧～',
          '发送[/我的资料]了解个人信息',
          '发送[/跳过]可跳过新手指引'
        ].join('\n')
      )
    )
    return
  },
  'message.create',
  /^(#|\/)启动新手指引$/
)
