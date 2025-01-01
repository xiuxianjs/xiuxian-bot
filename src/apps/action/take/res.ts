import { Text, useSend } from 'alemonjs'

import { Bag, Equipment, Levels, operationLock } from '@xiuxian/core/index'
import { Attributes, user } from '@src/xiuxian/db'
import Xiuxian from '@src/apps/index'
export const regular = /^(#|\/)服用[\u4e00-\u9fa5]+\*\d+$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)服用[\u4e00-\u9fa5]+\*\d+$/.test(e.MessageText)) {
        next()
        return
      }
      // lock
      const T = await operationLock(e.UserKey)
      const Send = useSend(e)
      if (!T) {
        Send(Text('操作频繁'))
        return
      }
      // is user
      const UID = e.UserKey
      const UserData = e['UserData'] as Attributes<typeof user>
      // message parse
      const text = e.MessageText
      if (!text) return
      const [thingName, thingAcount] = text
        .replace(/^(#|\/)服用/, '')
        .split('*')
      const thing = await Bag.searchBagByName(UID, thingName)
      if (!thing) {
        Send(Text(`没有[${thingName}]`))
        return
      }
      if (thing.acount < Number(thingAcount)) {
        Send(Text('数量不足'))
        return
      }

      // 得到用户数据
      switch (thing.addition) {
        case 'boolere_covery': {
          let size = thing.boolere_covery * Number(thingAcount)
          size = size > 100 ? 100 : size
          const blood = await Equipment.addBlood(UserData, size)
          Send(Text(`💊${thingName}\n恢复了${size}%的血量\n🩸${blood}`))
          break
        }
        case 'exp_gaspractice': {
          if (thing.exp_gaspractice <= 0) {
            Send(Text(`[修为]+${0}`))
            break
          }
          const size = Math.floor(
            (Number(thingAcount) *
              thing.exp_gaspractice *
              (UserData.talent_size + 100)) /
              100
          )
          const { msg } = await Levels.addExperience(UID, 1, size)
          Send(Text(msg))
          break
        }
        case 'exp_bodypractice': {
          const size = Math.floor(
            (Number(thingAcount) *
              thing.exp_bodypractice *
              (UserData.talent_size + 100)) /
              100
          )
          const { msg } = await Levels.addExperience(UID, 2, size)
          Send(Text(msg))

          break
        }
        case 'exp_soul': {
          const size = Math.floor(
            (Number(thingAcount) *
              thing.exp_soul *
              (UserData.talent_size + 100)) /
              100
          )
          const { msg } = await Levels.addExperience(UID, 3, size)
          Send(Text(msg))
          break
        }
        default: {
          Send(Text(`啥也不是的东东,丢了~`))
        }
      }
      await Bag.reduceBagThing(UID, [
        {
          name: thing.name,
          acount: Number(thingAcount)
        }
      ])
      return
    }
  ],
  ['message.create', 'private.message.create']
)
