import { user } from '@xiuxian/db/index'
import { Text, useSend } from 'alemonjs'
import { newcomer } from '@src/middleware/newcomer'
import { operationLock } from '@src/xiuxian/core'

/**
 * 完成的新手指引
 * 是独立的环境。
 */
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    //
    const Send = useSend(e)

    // 操作锁
    const isLock = await operationLock(e.UserKey)
    if (!isLock) {
      Send(Text('操作频繁'))
      // close()
      return
    }

    // 得到用户邮箱
    const UID = e.UserKey

    if (!UID) {
      Send(Text('请先登录'))
      return
    }

    // 得到数据
    const data = await user.findOneValue({
      where: {
        uid: UID
      }
    })

    const closeNewComer = () => {
      data.newcomer = 1
      user.update({ newcomer: 1 }, { where: { uid: UID } })
    }

    // 不存在步骤
    if (!newcomer[data.newcomer_step]) {
      closeNewComer()
      Send(
        Text(
          [
            '小柠檬：',
            '新手指引已经结束。',
            '重新开始可发送[/启动新手指引]'
          ].join('\n')
        )
      )
      return
    }

    //
    if (/^\/(跳过|跳过新手指引|跳过指引)/.test(e.MessageText)) {
      closeNewComer()
      Send(
        Text(
          [
            '小柠檬：',
            '哎呀,我要消失啦～',
            '重新开始可发送[/启动新手指引]'
          ].join('\n')
        )
      )
      return
    }

    // 获得指引
    const c = newcomer[data.newcomer_step]
    if (!c.reg.test(e.MessageText)) {
      // 新手指引指令错误
      next()
      return
    }

    // 新人必须是满血的。
    if (data.battle_blood_limit <= 800) {
      data.battle_blood_now = 800
    } else {
      data.battle_blood_now = data.battle_blood_limit
    }

    // 刷新步骤
    await user.update(
      { newcomer_step: 1 + data.newcomer_step },
      { where: { uid: data.uid } }
    )

    // 发送
    setTimeout(() => {
      Send(Text(['小柠檬：', c.ok].join('\n')))
    }, 2300)

    next()
    return
  },
  ['message.create', 'private.message.create']
)
