import { user } from '@xiuxian/db/index'
import { Text, useSend, useSubscribe } from 'alemonjs'
import { operationLocalLock } from '@src/middleware/util'
import NewsUser from '@src/middleware/newuser'
import { newcomer } from './newcomer'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
import { updatePlayer } from '@src/xiuxian/core/src/system/player'
export default OnMiddleware(
  async (e, next) => {
    // send
    const Send = useSend(e)

    // 本地内存操作锁，防止频繁操作
    const offLocalLock = operationLocalLock(e.UserKey)

    // loack
    if (!offLocalLock) {
      Send(Text('操作频繁'))
      return
    }

    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }

    // user id
    const UID = e.UserKey

    // data
    const data = await user.findOneValue({
      where: {
        uid: UID
      }
    })

    if (!data) {
      Send(Text('数据开始生产....'))
      // 开始创建存档
      updatePlayer(UID).then(() => {
        Send(Text('数据创建成功'))
      })
      return
    }

    // 不是新手
    if (data.newcomer != 0) {
      // 携带数据
      e['UserData'] = data
      // continue
      next()
      return
    }

    const closeNewComer = () => {
      data.newcomer = 1
      user.update({ newcomer: 1 }, { where: { uid: UID } })
    }

    // 不存步骤
    if (!newcomer[data.newcomer_step]) {
      closeNewComer()

      // 携带数据
      e['UserData'] = data
      // continue
      next()
      return
    }

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
      Send(
        Text(`小柠檬: 开始新手指引,请发送[${newcomer[data.newcomer_step].msg}]`)
      )
    } else {
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

      // 携带数据
      Send(Text(['小柠檬：', c.ok].join('\n')))
    }

    const [subscribe] = useSubscribe(e, 'message.create')

    // 锁定用户的所有操作？
    subscribe(NewsUser.current, ['UserId'])

    return
  },
  ['message.create', 'private.message.create']
)
