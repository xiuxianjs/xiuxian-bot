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

const newcomer: {
  [key: string]: {
    reg: RegExp
    msg: string
    ok: string
    err: (msg: string) => string
  }
} = {
  '0': {
    reg: /^\/我的资料$/,
    msg: '/我的资料',
    ok: '成功啦～,你好像还没有物品哦,但你可以使用[/联盟签到]领取每日物品',
    err: (msg: string) => `不对哦～请再次发送[${msg}]`
  },
  '1': {
    reg: /^\/联盟签到$/,
    msg: '/联盟签到',
    ok: '灵石，是新人快速突破的物品之一,快试试[/使用极品灵石]增加修为',
    err: (msg: string) => `不对哦～请再次发送[${msg}]`
  },
  '2': {
    reg: /^\/使用极品灵石$/,
    msg: '/使用极品灵石',
    ok: '突破需要海量的修为,可以开采灵矿获得大量灵石,快试试[/探索灵矿]',
    err: (msg: string) => `不对哦～请再次发送[${msg}]`
  },
  '3': {
    reg: /^\/探索灵矿$/,
    msg: '/探索灵矿',
    ok: '探得灵矿,使用[/开采“标记”],可消耗掉“开灵铲”',
    err: (msg: string) => `不对哦～请再次发送[${msg}]`
  },
  '4': {
    reg: /^\/开采/,
    msg: '/开采“标记”',
    ok: '除了采集灵矿外,击杀怪物的收获更为丰富,试试[/探索怪物]',
    err: (msg: string) => `不对哦～请再次发送[${msg}]`
  },
  '5': {
    reg: /^\/探索怪物$/,
    msg: '/探索怪物',
    ok: '',
    err: (msg: string) => `不对哦～请再次发送[${msg}]`
  },
  '9': {
    reg: /^\/闭关$/,
    msg: '/闭关',
    ok: '这是交易用的哦,新手指引到这里就结束啦,更多内容,可发送[/修仙帮助]进行了解,再见～',
    err: (msg: string) => `不对哦～请再次发送[${msg}]`
  }
}

//
const CD = {}

/**
 * @param UID
 * @returns
 */
const operationLocalLock = (UID: string) => {
  const Now = Date.now()
  // 2300
  if (CD[UID] && Number(CD[UID]) + 2300 > Now) {
    return false
  }
  CD[UID] = Now
  return true
}

//
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
                '[小柠檬]',
                '欢迎来到<史上第一掌门>系统',
                '我是你的萌新助手',
                '接下来跟随我的指引',
                '学习如何踏入仙途吧～',
                '________',
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
    e['UserData'] = data
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
      Send(Text(['[小柠檬]', '不对哦～', '你的指令是空的'].join('\n')))
      e.Megs = []
      return e
    }
    //
    if (/^\/跳过/.test(txt)) {
      Send(Text(['[小柠檬]', '哎呀,我要消失啦～'].join('\n')))
      user.update({ newcomer: 1 }, { where: { uid: data.uid } })
      e.Megs = []
      return e
    }
    // 获得 指引
    const c = newcomer[data.newcomer_step]
    if (!c.reg.test(txt)) {
      Send(Text(['[小柠檬]', c.err(c.msg)].join('\n')))
      return e
    }
    await user.update(
      { newcomer_step: 1 + data.newcomer_step },
      { where: { uid: data.uid } }
    )
    setTimeout(() => {
      Send(Text(['[小柠檬]', c.ok].join('\n')))
    }, 2000)
    return e
  },
  ['message.create', 'private.message.create']
)
