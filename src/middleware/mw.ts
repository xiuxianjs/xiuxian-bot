import { Burial, Cooling, operationLock, Player } from '@src/xiuxian/core'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { map_point, user } from '@xiuxian/db/index'
import { Text, useParse, useSend } from 'alemonjs'
import { newcomer } from './newcomer'
import { operationLocalLock } from './util'
import { ControlByBlood, endAllWord } from '@src/xiuxian/api'

// 指引标记
const UIDS = {}

export default OnMiddleware(
  async e => {
    // 获取 txt
    const txt = useParse(e.Megs, 'Text')
    // discord 和 kook 是全局域，需要挑过
    if (process.argv.includes('discord') || process.argv.includes('kook')) {
      // 不是  / 或 # 开头的，跳过
      if (!/^(\/|#)/.test(txt)) {
        e.Megs = []
        return e
      }
    }
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
        e.Megs = []
        return e
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
                '发送[/跳过]可跳过新手指引'
              ].join('\n')
            )
          )
          UIDS[UID] = true
        })
        .catch(err => {
          console.error(err)
          Send(Text('未寻得仙缘'))
        })
      // 清空数据
      e.Megs = []
      return e
    }

    //
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

    const T = await operationLock(e.UserId)
    if (!T) {
      Send(Text('操作频繁'))
      e.Megs = []
      return e
    }

    // 没有提示跳过
    if (!UIDS[UID]) {
      // 强制空闲状态
      await user.update({ state: 0 }, { where: { uid: data.uid } })
      // 记录跳过
      UIDS[UID] = true
      // 发送
      Send(Text(['小柠檬：', '发送[/跳过]可跳过新手指引～'].join('\n')))
      //
      if (data.state == 1 || data.state == 2 || data.state == 8) {
        // 自动结束闭关
        await endAllWord(e, data.uid, data)
      }
      //
      if (data.newcomer > 2 && data.newcomer <= 7) {
        const MapPointData = await map_point.findOneValue({
          where: {
            name: '天山'
          }
        })
        //
        data.point_type = MapPointData.type
        data.pont_attribute = MapPointData.attribute
        data.pont_x = MapPointData.x
        data.pont_y = MapPointData.y
        data.pont_z = MapPointData.z
        //
        await user.update(
          {
            point_type: MapPointData.type, // 地点类型_默认0
            pont_attribute: MapPointData.attribute, // 地点属性_默认0
            pont_x: MapPointData.x, // 地点x轴_默认0
            pont_y: MapPointData.y, // 地点y轴_默认0
            pont_z: MapPointData.z // 地点z轴_默认0
          },
          {
            where: {
              uid: data.uid
            }
          }
        )
      } else if (data.newcomer > 7) {
        const MapPointData = await map_point.findOneValue({
          where: {
            name: '极西'
          }
        })
        //
        data.point_type = MapPointData.type
        data.pont_attribute = MapPointData.attribute
        data.pont_x = MapPointData.x
        data.pont_y = MapPointData.y
        data.pont_z = MapPointData.z
        //
        await user.update(
          {
            point_type: MapPointData.type, // 地点类型_默认0
            pont_attribute: MapPointData.attribute, // 地点属性_默认0
            pont_x: MapPointData.x, // 地点x轴_默认0
            pont_y: MapPointData.y, // 地点y轴_默认0
            pont_z: MapPointData.z // 地点z轴_默认0
          },
          {
            where: {
              uid: data.uid
            }
          }
        )
      }
    }

    if (!txt) {
      Send(Text(['小柠檬：', '不对哦～', '你的指令是空的'].join('\n')))
      e.Megs = []
      return e
    }

    //
    if (/^\/(跳过|跳过新手指引|跳过指引)/.test(txt)) {
      Send(
        Text(
          [
            '小柠檬：',
            '哎呀,我要消失啦～',
            '重新开始可发送[/启动新手指引]'
          ].join('\n')
        )
      )
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

    // 发送
    setTimeout(() => {
      Send(Text(['小柠檬：', c.ok].join('\n')))
    }, 2300)
    return e
  },
  ['message.create', 'private.message.create']
)