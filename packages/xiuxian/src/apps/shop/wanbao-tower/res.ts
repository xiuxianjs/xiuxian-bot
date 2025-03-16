import { controlByName } from '@xiuxian/api/index'
import * as DB from '@xiuxian/db/index'

import Xiuxian, { selects } from '@src/apps/index'

import * as GameApi from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'

export const regular =
  /^(#|\/)查看(万宝楼|萬寶樓)(武器|护具|法宝|丹药|功法|道具|材料|装备)?$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UserData = e['UserData'] as DB.Attributes<typeof DB.user>
    if (!(await controlByName(e, UserData, '万宝楼'))) return
    const start_msg = ['___[万宝楼]___', '欢迎光顾本店']
    const text = e.MessageText
    const type = text.replace(/^(#|\/)查看(万宝楼|萬寶樓)/, '')
    const commoditiesList = await DB.goods_commodities
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
    const end_msg = GameApi.Goods.getListMsg(
      commoditiesList,
      '灵石',
      GameApi.Cooling.ExchangeStart
    )
    const Send = useSend(e)
    Send(Text(start_msg.concat(end_msg).join('\n')))
    return
  }
])
