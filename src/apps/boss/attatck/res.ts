import { Text, useSend } from 'alemonjs'

import { ControlByBlood, victoryCooling } from '@xiuxian/api/index'
import { Boss, Fight, operationLock } from '@xiuxian/core/index'
import { Attributes, Redis, user } from '@xiuxian/db/index'
// 攻击
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)攻击(金角|银角)/.test(e.MessageText)) {
      next()
      return
    }
    const UID = e.UserKey

    // lock start
    const T = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }

    // 检查活动时间
    if (!Boss.isBossActivityOpen()) {
      Send(Text('BOSS已经逃跑....'))
      return
    }

    //
    const UserData = e['UserData'] as Attributes<typeof user>

    //
    if (UserData.special_spiritual < 1) {
      Send(Text(`${UserData.immortal_grade > 0 ? '仙力' : '灵力'}不足`))
      return
    }

    // 血量不足
    if (!(await ControlByBlood(e, UserData))) return

    const text = e.MessageText
    let key: '1' | '2' = '1'
    if (/银角/.test(text)) {
      key = '2'
    }

    //
    const lock = await Redis.get(`lock:boss:lock:${key}`)
    if (lock && Date.now() - Number(lock) < 6 * 1000) {
      Send(Text('怪物躲过了你的攻击...'))
      return
    }

    //
    const CDID = 25

    if (!(await victoryCooling(e, UID, CDID))) return

    // 一定时间解锁
    await Redis.set('lock:boss', Date.now())

    // 查看boss信息
    const bossInfo = await Boss.getBossData(key)
    // 如果没有boss信息,则创建
    if (!bossInfo) {
      Send(Text('BOSS正在降临...'))
      Boss.updateBossData(key)
      return
    }

    if (
      bossInfo.data.battle_blood_now <= 1 ||
      Date.now() - bossInfo.createAt > 60 * 1000 * (key == '1' ? 7 : 5)
    ) {
      Send(Text(`BOSS将在${key == '1' ? 7 : 5}分钟内复活....`))
      Boss.updateBossData(key)
      return
    }

    //
    try {
      // 如果创建时间超过2h,则重新创建
      if (Date.now() - bossInfo.createAt > 12 * 60 * 60 * 1000) {
        Send(Text('BOSS已经逃跑....'))
        Boss.updateBossData(key)
        return
      }

      // 怪物没有那么多的字段
      const BMSG = Fight.startBoss(UserData, {
        ...bossInfo.data,
        immortal_grade: 1
      })

      //
      if (bossInfo.data.battle_blood_now <= 1) {
        // 刷新怪物
        Boss.updateBossData(key)
      } else {
        // 更新怪物数据
        await Boss.setBossData(key, {
          createAt: bossInfo.createAt,
          level: bossInfo.level,
          data: {
            ...bossInfo.data,
            battle_blood_now: BMSG.battle_blood_now.b
          }
        })
      }

      const size = BMSG.size ?? 1

      // y=ax^0.2
      const value = Math.floor(Math.pow(size, 0.2))

      const battle_blood_now = BMSG.battle_blood_now.a
      const special_spiritual = UserData.special_spiritual - 1

      let special_reputation = UserData.special_reputation

      if (value > 1) {
        BMSG.msg.push(`获得[声望]*${value}`)
        special_reputation += value
      }

      // 更新玩家数据
      await user.update(
        {
          battle_blood_now: battle_blood_now,
          // 灵力
          special_spiritual: special_spiritual,
          // 声望
          special_reputation
        },
        {
          where: {
            uid: UID
          }
        }
      )

      // 释放lock
      await Redis.del(`lock:boss:lock:${key}`)

      Send(Text(BMSG.msg.join('\n')))

      //
    } catch (e) {
      console.error(e)
      Send(Text('BOSS信息异常'))
    }
  },
  ['message.create', 'private.message.create']
)
