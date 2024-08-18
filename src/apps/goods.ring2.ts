import { Messages } from 'alemonjs'
import { isThereAUserPresent } from 'xiuxian-api'
import * as GameApi from 'xiuxian-core'
export default new Messages().response(
  /^(#|\/)?(戒指|(纳|呐|那)(借|介|戒))取出[\u4e00-\u9fa5]+\*\d+$/,
  async e => {
    const UID = e.user_id
    if (!(await isThereAUserPresent(e, UID))) return
    const [thingName, thingAcount] = e.msg
      .replace(/^(#|\/)?(戒指|(纳|呐|那)(借|介|戒))取出/, '')
      .split('*')
    // 检查戒指
    const thing = await GameApi.Ring.searchRingByName(UID, thingName)
    if (!thing) {
      e.reply([`没有[${thingName}]`], {
        quote: e.msg_id
      })
      return
    }
    if (thing.acount < Number(thingAcount)) {
      e.reply(['数量不足'], {
        quote: e.msg_id
      })
      return
    }
    // 检查储物袋空间
    const UserData = await GameApi.Users.read(UID)
    // 检查储物袋有没有这个物品
    const BagThing = await GameApi.Bag.searchBagByName(UID, thingName)
    // 检查储物袋空间
    const BagSize = await GameApi.Bag.backpackFull(UID, UserData.bag_grade)
    // 背包满位置了直接返回了
    if (!BagThing && !BagSize) {
      e.reply(['储物袋空间不足'], {
        quote: e.msg_id
      })
      return
    }

    // 储物袋增加
    await GameApi.Bag.addBagThing(UID, UserData.bag_grade, [
      {
        name: thingName,
        acount: Number(thingAcount)
      }
    ])

    // 戒指减少
    await GameApi.Ring.reduceRingThing(UID, [
      {
        name: thingName,
        acount: Number(thingAcount)
      }
    ])
    e.reply(['取出', thingName], {
      quote: e.msg_id
    })
    return
  }
)