import { user } from '@xiuxian/db/index'
import {
  createSelects,
  EventsMessageCreateEnum,
  Text,
  useSend,
  useSubscribe
} from 'alemonjs'
import { updatePlayer } from '@src/xiuxian/core/src/system/player'
import { operationLocalLock } from './util'
import { newcomer } from './newcomer'
import NewsUser from './newuser'
import { UserDataType } from '@src/xiuxian/api'
import { addAddressToId } from '@src/xiuxian/core/src/system/address'

export const selects = createSelects([
  'message.create',
  'private.message.create'
])

// 获取用户数据
export const useCurrent = (e: EventsMessageCreateEnum) => {
  return {
    UserData: e['UserData'] as UserDataType
  }
}

export default onResponse(selects, async (e, next) => {
  if (e.Platform == 'telegram' || e.Platform == 'wechat') {
    // 暂时不支持
    next()
    return
  }
  // 不需要@的平台，必须有前缀的才能出发
  const pl = ['discord', 'qq', 'kook', 'onebot']
  if (pl.includes(e.Platform) && !/^(#|\/)/.test(e.MessageText)) {
    // 不做任何反馈。
    return
  }

  // 更新地址
  if (e.name === 'message.create') {
    await addAddressToId(e.ChannelId, e.UserKey)
  }

  // send
  const Send = useSend(e)

  // 本地内存操作锁，防止频繁操作
  const offLocalLock = operationLocalLock(e.UserKey)

  // loack
  if (!offLocalLock) {
    Send(Text('操作频繁'))
    return
  }

  /**
   * 把玩家标记到该地点。
   */

  // user id
  const UID = e.UserKey

  // data
  const data = await user.findOneValue({
    where: {
      uid: UID
    }
  })

  if (!data) {
    // 开始创建存档
    updatePlayer(UID).then(() => {
      Send(
        Text(
          '数据（游戏测试中...）生成完成.\n可发送[/开启指引]以进入新手模式...'
        )
      )
    })
    return
  }

  // 不是新人
  if (data.newcomer != 0) {
    // 携带数据
    e['UserData'] = data
    return true
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
    return true
  }

  if (/^(\/|#)(跳过)(新人)?指引/.test(e.MessageText)) {
    closeNewComer()
    Send(
      Text(
        ['小柠檬：', '哎呀,我要消失啦～', '重新开始可发送[/开启指引]'].join(
          '\n'
        )
      )
    )
    return
  }

  // 获得指引
  const c = newcomer[data.newcomer_step]
  if (!c.reg.test(e.MessageText)) {
    // 新人指引指令错误
    Send(
      Text(
        `小柠檬: \n开始新人指引,请发送[${newcomer[data.newcomer_step].msg}]\n跳过指引可发送[/跳过指引]`
      )
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
    Send(Text(['小柠檬：', c.ok, `\n跳过指引可发送[/跳过指引]`].join('\n')))
  }

  if (e.name === 'message.create') {
    // 订阅
    const [subscribe] = useSubscribe(e, 'message.create')
    // 锁定用户的所有操作？
    subscribe(NewsUser.current, ['UserId'])
  } else {
    // 订阅
    const [subscribe] = useSubscribe(e, 'private.message.create')
    // 锁定用户的所有操作？
    subscribe(NewsUser.current, ['UserId'])
  }
})
