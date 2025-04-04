import { Bag, Cooling, Skills } from '@xiuxian/core/index'
import { user, user_skills } from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
import { operationLock } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
export const regular = /^(#|\/)?(学习|學習)[\u4e00-\u9fa5]+$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // lock
    const T = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    // is user
    const UID = e.UserKey
    // message parse
    const text = e.MessageText
    if (!text) return
    const thingName = text.replace(/^(#|\/)?(学习|學習)/, '')
    const thing = await Bag.searchBagByName(UID, thingName)
    if (!thing) {
      Send(Text(`没有[${thingName}]`))
      return
    }

    const AllSorcery = await user_skills.findAllValues({ where: { uid: UID } })
    const islearned = AllSorcery.find(item => item.name == thingName)
    if (islearned) {
      Send(Text('学过了'))

      return
    }

    if (AllSorcery.length >= Cooling.myconfig_gongfa) {
      Send(Text('反复看了又看\n却怎么也学不进'))

      return
    }

    /**
     * 新增功法
     */
    await user_skills.create({ uid: UID, name: thing.name })

    // 更新天赋
    setTimeout(async () => {
      const UserData = await user.findOneValue({
        where: {
          uid: UID
        }
      })
      await Skills.updataEfficiency(UID, UserData.talent)
    }, 1000)
    await Bag.reduceBagThing(UID, [
      {
        name: thing.name,
        acount: 1
      }
    ])
    Send(Text(`学习[${thingName}]`))
    return
  }
])
