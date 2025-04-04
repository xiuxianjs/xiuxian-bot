import { controlByName } from '@xiuxian/api/index'
import * as DB from '@xiuxian/db/index'

import Xiuxian, { selects } from '@src/apps/index'

import * as GameApi from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'

export const regular =
  /^(#|\/)?查看(商会|商會)(武器|护具|法宝|丹药|功法|道具|材料|装备)?$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UserData = e['UserData'] as DB.Attributes<typeof DB.user>
    if (!(await controlByName(e, UserData, '联盟'))) return
    const start_msg = ['___[联盟商会]___', '[/兑换+物品名*数量]']
    const text = e.MessageText
    const type = text.replace(/^(#|\/)?查看(商会|商會)/, '')
    const commoditiesList = await DB.goods_alliancemall
      .findAll({
        include: [
          {
            model: DB.goods,
            where: {
              type: GameApi.Goods.mapType[type] ?? GameApi.Goods.mapType['道具']
            }
          }
        ]
      })
      .then(item => item.map(item => item?.dataValues['good']['dataValues']))
    const Send = useSend(e)
    const end_msg = GameApi.Goods.getListMsg(commoditiesList, '声望')
    Send(Text(start_msg.concat(end_msg).join('\n')))
    return
  }
])
