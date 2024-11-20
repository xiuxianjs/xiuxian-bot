/**
 * *****
 * 中间件
 * 处理用户数据和拦截
 * ****
 */
import { Burial, Cooling, operationLock, Player } from '@src/xiuxian/core'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { user } from '@xiuxian/db/index'
import { Text, useParse, useSend } from 'alemonjs'
import { newcomer } from './newcomer'
import { operationLocalLock } from './util'
import { ControlByBlood } from '@src/xiuxian/api'
export default OnMiddleware(
  async e => {
    const Send = useSend(e)
    if (!operationLocalLock(e.UserId)) {
      Send(Text('操作频繁'))
      e.Megs = []
      return e
    }
    const UID = await getEmailUID(e.UserId)
    const data = await user.findOneValue({
      where: {
        uid: UID
      }
    })
    if (!data) {
      const T = await operationLock(e.UserId)
      if (!T) {
        Send(Text('操作频繁'))
        return
      }
      Player.updatePlayer(UID, e.UserAvatar)
        .then(() => {
          // 设置冷却
          Burial.set(UID, 8, Cooling.CD_Reborn)
          //
          Send(
            Text(
              [
                '小柠檬：',
                '欢迎来到<史上第一掌门>系统',
                '我是你的萌新助手',
                '接下来跟随我的指引',
                '学习如何踏入仙途吧～',
                '发送[/我的资料]了解个人信息',
                '发送[/跳过]可跳过指引'
              ].join('\n')
            )
          )
        })
        .catch(err => {
          console.error(err)
          Send(Text('未寻得仙缘'))
        })
      // 清空数据
      e.Megs = []
      return e
    }
    const T = await operationLock(e.UserId)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    // 不是新手
    if (data.newcomer != 0) {
      return e
    }
    // 不存在步骤
    if (!newcomer[data.newcomer_step]) {
      data.newcomer = 1
      user.update({ newcomer: 1 }, { where: { uid: data.uid } })
      return e
    }
    const txt = useParse(e.Megs, 'Text')
    if (!txt) {
      Send(Text(['小柠檬：', '不对哦～', '你的指令是空的'].join('\n')))
      e.Megs = []
      return e
    }
    //
    if (/^\/跳过/.test(txt)) {
      Send(Text(['小柠檬：', '哎呀,我要消失啦～'].join('\n')))
      user.update({ newcomer: 1 }, { where: { uid: data.uid } })
      e.Megs = []
      return e
    }
    // 获得指引
    const c = newcomer[data.newcomer_step]
    if (!c.reg.test(txt)) {
      Send(Text(['小柠檬：', c.err(c.msg)].join('\n')))
      e.Megs = []
      return e
    }
    // 新人必须是满血的。
    if (data.battle_blood_limit <= 800) {
      data.battle_blood_now = 800
    } else {
      data.battle_blood_now = data.battle_blood_limit
    }
    //
    e['UserData'] = data
    // 状态进行中
    if (!(await ControlByBlood(e, data))) {
      e.Megs = []
      return e
    }
    // 刷新步骤
    await user.update(
      { newcomer_step: 1 + data.newcomer_step },
      { where: { uid: data.uid } }
    )
    setTimeout(() => {
      Send(Text(['小柠檬：', c.ok].join('\n')))
    }, 2000)
    return e
  },
  ['message.create', 'private.message.create']
)
