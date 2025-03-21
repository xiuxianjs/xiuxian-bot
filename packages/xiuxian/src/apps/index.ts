import { Attributes, user } from '@xiuxian/db/index'
import {
  createSelects,
  PrivateEventMessageCreate,
  PublicEventMessageCreate,
  Text,
  useSend,
  useSubscribe
} from 'alemonjs'
import { updatePlayer } from '@src/xiuxian/core/src/system/player'
import { operationLocalLock } from './util'
import { newcomer } from './newcomer'
import NewsUser from './newuser'

export const selects = createSelects([
  'message.create',
  'private.message.create'
])

type UserDataType = Attributes<typeof user>

// 获取用户数据
export const useCurrent = (
  e: PublicEventMessageCreate | PrivateEventMessageCreate
) => {
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

  // send
  const Send = useSend(e)

  // 本地内存操作锁，防止频繁操作
  const offLocalLock = operationLocalLock(e.UserKey)

  // loack
  if (!offLocalLock) {
    Send(Text('操作频繁'))
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

  // 订阅
  const [subscribe] = useSubscribe(e, 'message.create')
  // 锁定用户的所有操作？
  subscribe(NewsUser.current, ['UserId'])
})
