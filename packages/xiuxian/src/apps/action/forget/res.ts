import { Text, useSend } from 'alemonjs'
import { Bag, Skills } from '@xiuxian/core/index'
import { user, user_skills } from '@xiuxian/db/index'
import { operationLock } from '@xiuxian/core/index'
import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^(#|\/)?忘掉[\u4e00-\u9fa5]+$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // 操作锁
    const T = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    // 检查用户
    const UID = e.UserKey
    // 解析
    const text = e.MessageText
    if (!text) return
    const thingName = text.replace(/^(#|\/)?忘掉/, '')
    const AllSorcery = await user_skills.findAllValues({ where: { uid: UID } })
    const islearned = AllSorcery.find(item => item.name == thingName)
    if (!islearned) {
      Send(Text(`没学过[${thingName}]`))
      return
    }
    // 检查背包
    const BagSize = await Bag.backpackFull(UID)
    if (!BagSize) {
      Send(Text('储物袋空间不足'))
      return
    }
    // 直接删
    await user_skills.destroy({ where: { uid: UID, name: thingName } })
    // 更新天赋
    setTimeout(async () => {
      const UserData = await user.findOneValue({
        where: {
          uid: UID
        }
      })
      await Skills.updataEfficiency(UID, UserData.talent)
    }, 500)
    await Bag.addBagThing(UID, [{ name: islearned.name, acount: 1 }])
    Send(Text(`忘掉[${thingName}]`))
  }
])
