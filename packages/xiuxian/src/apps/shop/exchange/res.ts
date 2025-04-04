import { controlByName } from '@xiuxian/api/index'
import * as DB from '@xiuxian/db/index'
import Xiuxian, { selects, useCurrent } from '@src/apps/index'
import * as GameApi from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
export const regular = /^(#|\/)?(兑换|兌換)[\u4e00-\u9fa5]+\*\d+$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // lock start
    const T = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    // 从消息中获取用户ID
    const UID = e.UserKey
    const UserData = useCurrent(e).UserData
    if (!(await controlByName(e, UserData))) return
    // 解析消息
    const text = e.MessageText
    const [thingName, quantity] = text
      .replace(/^(#|\/)?(兑换|兌換)/, '')
      .split('*')
    //
    const ifexist: DB.Attributes<typeof DB.goods> = await DB.goods_alliancemall
      .findOne({
        include: [
          {
            model: DB.goods,
            where: {
              name: thingName
            }
          }
        ]
      })
      .then(item => item?.dataValues['good']['dataValues'])
    if (!ifexist) {
      Send(Text(`[联盟]叶铭\n没有[${thingName}]`))
      return
    }
    const price = Math.floor(ifexist.price * Number(quantity))
    if (UserData.special_reputation < price) {
      Send(Text(`[联盟]叶铭\n你似乎没有${price}*[声望]`))

      return
    }
    // 检查背包
    const BagSize = await GameApi.Bag.backpackFull(UID)
    // 背包未位置了直接返回了
    if (!BagSize) {
      Send(Text('储物袋空间不足'))
      return
    }
    UserData.special_reputation -= price
    // 更新用户
    await DB.user.update(
      {
        special_reputation: UserData.special_reputation
      },
      {
        where: {
          uid: UID
        }
      }
    )
    //
    await GameApi.Bag.addBagThing(UID, [
      {
        name: ifexist.name,
        acount: Number(quantity)
      }
    ])
    //
    Send(
      Text(`[联盟]叶铭\n使用[声望]*${price}兑换了[${thingName}]*${quantity},`)
    )
    return
  }
])
