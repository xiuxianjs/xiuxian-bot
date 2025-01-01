import { controlByName } from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
import { Attributes, user } from '@xiuxian/db/index'
import { Text, useSend } from 'alemonjs'

import Xiuxian from '@src/apps/index'
export const regular = /^(#|\/)(贡献|貢獻)[\u4e00-\u9fa5]+\*\d+$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)(贡献|貢獻)[\u4e00-\u9fa5]+\*\d+$/.test(e.MessageText)) {
        next()
        return
      }
      // lock start
      const T = await GameApi.operationLock(e.UserKey)
      const Send = useSend(e)
      if (!T) {
        Send(Text('操作频繁'))
        return
      }
      // 从消息中获取用户ID
      const UID = e.UserKey
      const UserData = e['UserData'] as Attributes<typeof user>
      if (!(await controlByName(e, UserData, '联盟'))) return
      // 解析消息
      const text = e.MessageText
      const [thingName, quantity] = text
        .replace(/^(#|\/)(贡献|貢獻)/, '')
        .split('*')
      const thing = await GameApi.Bag.searchBagByName(UID, thingName)
      if (!thing) {
        Send(Text(`[联盟]黄天霸\n没有[${thingName}]`))
        return
      }
      if (thing.acount < Number(quantity)) {
        Send(Text(`[联盟]黄天霸\n数量不足`))
        return
      }
      if (thing.price * Number(quantity) < 2000) {
        Send(Text(`[联盟]黄天霸\n物品价值不足2000`))
        return
      }
      // 减少
      await GameApi.Bag.reduceBagThing(UID, [
        {
          name: thing.name,
          acount: Number(quantity)
        }
      ])
      const size = Math.floor((thing.price * Number(quantity)) / 66)
      // 更新用户
      await user.update(
        {
          special_reputation: UserData.special_reputation + size
        },
        {
          where: {
            uid: UID
          }
        }
      )
      Send(Text(`[联盟]黄天霸\n贡献成功,奖励[声望]*${size}`))
      return
    }
  ],
  ['message.create', 'private.message.create']
)
